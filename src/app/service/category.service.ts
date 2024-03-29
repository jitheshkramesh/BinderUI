import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BYPASS_LOG } from '../interceptors/auth.interceptor';
import { Observable, map, pipe } from 'rxjs';

export interface ICategory {
  id?: number,
  categoryName: string,
  categoryImageUrl?: string,
  categoryImageLocalPath?: string
}

export interface ServiceType {
  isSuccess?: boolean,
  statusVal?: string,
  message?: string,
  result?: Array<ICategory>
}

export interface ServiceTypeEdit {
  isSuccess?: boolean,
  statusVal?: string,
  message?: string,
  result?: ICategory
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = 'https://localhost:7105/api/Category';
 public imagePath = './assets/Uploads/Category/';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ServiceType>(this.baseUrl).pipe(map((cust: ServiceType) => {
      console.log(cust);
      return cust.result.map(cust => ({
        id: cust.id,
        categoryName: cust.categoryName,
        categoryImageUrl: (cust.categoryImageLocalPath !== null) ? cust.categoryImageLocalPath : this.imagePath + cust.categoryImageUrl
      }))
    }));
  }

  getCategory(id: number): Observable<ServiceTypeEdit> {
    return this.http.get<ServiceTypeEdit>(this.baseUrl + '/' + id);
  };


  postCategory(inputData: any) {
    return this.http.post(this.baseUrl, inputData);
  }

  deleteCategory(inputData: any) {
    return this.http.delete(this.baseUrl, inputData);
  }

  uploadImage(inputData: any) {
    return this.http.post(this.baseUrl + '/UploadImage', inputData, { context: new HttpContext().set(BYPASS_LOG, true) });
  }

  removeImage(inputData: any) {
    return this.http.post(this.baseUrl, inputData);
  }
}
