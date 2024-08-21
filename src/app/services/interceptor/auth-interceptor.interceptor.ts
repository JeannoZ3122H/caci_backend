import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import {
  CookieSecureService,
} from '../secure/cookie-secure/cookie-secure.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (request, next) => {
    let getToken!: CookieSecureService;
    const token: any = getToken.getTokenToCookie();
    if (token) {
        const authRequest = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
            }
        });
        return next(authRequest);
    }
    return next(request);
};

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let getToken!: CookieSecureService;
        const token: any = getToken.getTokenToCookie(); // Replace with your logic to retrieve the token

        if (token) {
            const authRequest = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    'Cache-Control': 'no-cache',
                    Pragma: 'no-cache'
                }
            });
            return next.handle(authRequest);
        }

        // Handle cases where token is not available (optional)

        return next.handle(request);
    }
}
