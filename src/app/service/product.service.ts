import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BYPASS_LOG } from '../interceptors/auth.interceptor';

export interface ProductServiceType {
  isSuccess?: boolean,
  statusVal?: string,
  message?: string,
  result?: Array<any>
}

export interface ServiceTypeEdit {
  isSuccess?: boolean,
  statusVal?: string,
  message?: string,
  result?: any
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'https://localhost:7105/api/product';
  imagePath = './assets/Uploads/Product/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductServiceType> {
    return this.http.get<ProductServiceType>(this.baseUrl);
  }

  getProduct(id: number): Observable<ServiceTypeEdit> {
    return this.http.get<ServiceTypeEdit>(this.baseUrl + '/' + id);
  };

  postProduct(inputData: any) {
    return this.http.post(this.baseUrl, inputData);
  }

  deleteProduct(inputData: number) {
    return this.http.delete(this.baseUrl +'/'+ inputData);
  }

  uploadImage(inputData: any) {
    return this.http.post(this.baseUrl + '/UploadImage', inputData, { context: new HttpContext().set(BYPASS_LOG, true) });
  }

  removeImage(inputData: any) {
    return this.http.post(this.baseUrl, inputData);
  }
}
