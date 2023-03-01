import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var changedReq;
    changedReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    });
    return next.handle(changedReq);
  }
}
