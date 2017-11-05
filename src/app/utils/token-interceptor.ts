// src/app/auth/token.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf('admin/users/login') == -1) {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.auth.getToken()}`
        }
      });
    }
    return next.handle(request)
      .do(event => {
      console.log( event);
      if (event instanceof HttpResponse) {
        console.log(event.headers.keys());
      }
    });
  //  });
  }
}
