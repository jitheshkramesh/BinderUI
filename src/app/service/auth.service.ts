import { Injectable, signal } from '@angular/core';
import { userInterface } from '../interfaces/auth.interfaces';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://localhost:7105/api';
  apiUrlRegAdmin = this.baseUrl + '/Authentication/RegisterAdmin';
  apiUrlRegUser = this.baseUrl + '/Authentication/Register';
  logUrl = this.baseUrl + '/Authentication/Login';

  constructor(private http: HttpClient) { }

  loggedIn = signal<boolean>(false);
  loggedIn$ = new BehaviorSubject<boolean>(false);
  currentUserSignal = signal<userInterface | undefined | null>(undefined);
  user: userInterface | undefined;

  logIn() {
    this.loggedIn$.next(true);
    this.loggedIn.update(t => true);
    console.log('logIn() = ' + this.loggedIn$);
  }

  logOut() {
    localStorage.removeItem('token');
    this.currentUserSignal.set(null);
    this.loggedIn.update(t => false);
    this.loggedIn$.next(false);
  }

  isAuthenticated() {
    let val;
    this.loggedIn$.subscribe(c => {
      this.loggedIn.set(c);
    });
    return this.loggedIn();
  }

  userRegister(inputData: any) {
    return this.http.post(this.apiUrlRegAdmin, inputData);
  }

  userRegisterUser(inputData: any) {
    return this.http.post(this.apiUrlRegUser, inputData);
  }

  userLogin(inputData: any) {
    return this.http.post(this.logUrl, inputData);
  }

}
