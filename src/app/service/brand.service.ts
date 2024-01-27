import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BYPASS_LOG } from '../interceptors/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  baseUrl = 'https://localhost:7105/api/Brand';

  constructor(private http: HttpClient) { }

  getBrands(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  };

  postBrand(inputData: any) {     
    return this.http.post(this.baseUrl, inputData);
  }

  uploadImage(inputData: any) { 
    return this.http.post(this.baseUrl + '/UploadImage',inputData, { context: new HttpContext().set(BYPASS_LOG, true) });
  }

  removeImage(inputData: any) {
    return this.http.post(this.baseUrl, inputData);
  }


}

