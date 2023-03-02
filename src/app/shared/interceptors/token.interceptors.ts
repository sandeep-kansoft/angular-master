import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var changedReq;
    let token = this.auth.getAuthFromLocalStorage();
    changedReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        UserId: '27043',
        UserRole: 'Buyer',
        Authorization: token ? 'Bearer ' + token : '',
      },
    });
    return next.handle(changedReq);
  }
}
