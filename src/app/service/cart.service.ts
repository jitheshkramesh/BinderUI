import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BYPASS_LOG } from '../interceptors/auth.interceptor';

export interface CartUpdate {
  productId: number,
  quantity: number
}

export interface CartServiceType {
  isSuccess?: boolean,
  statusVal?: string,
  message?: string,
  result?: Array<any>
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = 'https://localhost:7105/api/cart';
  imagePath = './assets/Uploads/Product/';

  constructor(private http: HttpClient) { }

  getCarts(): Observable<CartServiceType> {
    return this.http.get<CartServiceType>(this.baseUrl + '/GetCart');
  }

  postCart(inputData: any) {
    return this.http.post(this.baseUrl + '/AddToCart', inputData);
  }

  deleteCart(inputData: number) {
    return this.http.delete(this.baseUrl + '/' + inputData);
  }

  uploadImage(inputData: any) {
    return this.http.post(this.baseUrl + '/UploadImage', inputData, { context: new HttpContext().set(BYPASS_LOG, true) });
  }

  removeImage(inputData: any) {
    return this.http.post(this.baseUrl, inputData);
  }
}
