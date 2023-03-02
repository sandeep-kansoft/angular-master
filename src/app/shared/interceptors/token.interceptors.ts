import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthModel } from 'src/app/modules/auth/models/auth.model';
import { CommonService } from '../common.service';

let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjpbIjIwMTYyIiwiMjAxNjIiXSwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiMjcwNDMiLCJzdWIiOiIyMDE2MiIsImp0aSI6ImE5OGUyYTMzLWMxN2UtNDAyYy05ZmEzLWRiMzVlMjlmMTAxNyIsImlhdCI6MTY3Nzc2NDc2OCwidG9rZW5fdmFsaWRpdHlfa2V5IjoiZGIzM2ZkYjAtNTc0Yi00MDYzLTlkZDUtOTYwYjQyZTVlOTM2IiwidXNlcl9pZGVudGlmaWVyIjoiMjAxNjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJCdXllciIsIm5iZiI6MTY3Nzc2NDc2OCwiZXhwIjoxNjc3NzY4MzY4LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDozMjc2OC8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDozMjc2OC8ifQ.nMAsWR1bLM2-pL1gZ9hHk7SvPnEZOtIGyDt-Cn29Loo`
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private commonServices : CommonService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var changedReq;
    
    const authData :AuthModel|null|undefined =  this.commonServices.getAuthData()
    changedReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        UserId: '27043',
        UserRole: 'Buyer',
        Authorization: authData ? authData.accessToken:'',
      },
    });
    return next.handle(changedReq);
  }
}



