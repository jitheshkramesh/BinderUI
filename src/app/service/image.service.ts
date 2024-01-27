import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  http: any;

  //constructor(private http: Http) {}


  public uploadImage(image: File): Observable<Response> {
    const formData = new FormData();

    formData.append('image', image);

    return this.http.post('/api/v1/image-upload', formData);
  }
}
