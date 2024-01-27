import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BYPASS_LOG } from '../interceptors/auth.interceptor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = 'https://localhost:7105/api/Category';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  };

  postCategory(inputData: any) {     
    return this.http.post(this.baseUrl, inputData);
  }

  uploadImage(inputData: any) { 
    return this.http.post(this.baseUrl + '/UploadImage',inputData, { context: new HttpContext().set(BYPASS_LOG, true) });
  }

  removeImage(inputData: any) {
    return this.http.post(this.baseUrl, inputData);
  }
}
