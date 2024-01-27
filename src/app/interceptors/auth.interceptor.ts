import { HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";

export const BYPASS_LOG = new HttpContextToken(() => false);

@Injectable()
export class authInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        const token = localStorage.getItem('token') ?? '';
        if (request.context.get(BYPASS_LOG) == false) { 
            const req = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });


            return next.handle(req);
        }

        const req = request.clone({
            setHeaders: { 
                'Authorization': `Bearer ${token}`
            }
        });


        return next.handle(req);
    }
}
