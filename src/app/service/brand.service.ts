import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BYPASS_LOG } from '../interceptors/auth.interceptor';

export interface IBrand {
  id?: number,
  brandName: string,
  brandImageUrl?: string,
  brandImageLocalPath?: string
}

interface ServiceType {
  isSuccess?: boolean,
  statusVal?: string,
  message?: string,
  result?: Array<IBrand>
}

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  baseUrl = 'https://localhost:7105/api/Brand';
  imagePath = './assets/Uploads/Brands/';

  constructor(private http: HttpClient) { }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<ServiceType>(this.baseUrl).pipe(map((cust: ServiceType) => {
      console.log(cust);
      return cust.result.map(cust => ({
        id:cust.id,
        brandName: cust.brandName,
        brandImageUrl: (cust.brandImageLocalPath !== null) ? cust.brandImageLocalPath : this.imagePath + cust.brandImageUrl
      }))
    }));
  }

  postBrand(inputData: any) {
    return this.http.post(this.baseUrl, inputData);
  }

  deleteBrand(inputData: number) {
    return this.http.delete(this.baseUrl +'/'+ inputData);
  }

  uploadImage(inputData: any) {
    return this.http.post(this.baseUrl + '/UploadImage', inputData, { context: new HttpContext().set(BYPASS_LOG, true) });
  }

  removeImage(inputData: any) {
    return this.http.post(this.baseUrl, inputData);
  }


}

