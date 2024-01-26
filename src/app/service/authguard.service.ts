import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private route: Router, private authService: AuthService) { }

  canActivate(): boolean {
    if (localStorage.getItem('token')) return true;
    if (this.authService.currentUserSignal()) return true;
    return false;
  }
}
