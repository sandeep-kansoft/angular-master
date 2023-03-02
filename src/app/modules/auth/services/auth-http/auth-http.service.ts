import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../models/user.model';
import { environment } from '../../../../../environments/environment';
import { AuthModel } from '../../models/auth.model';
import { LoginApi, baseUrl } from 'src/app/shared/constants/urlconfig';
import { LoginRequestDto } from '../../models/LoginRequestDto.model';

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = baseUrl;
  }
  // public methods
  login(payload: LoginRequestDto): Observable<any> {
    return this.http.post<AuthModel>(
      `${this.baseUrl}/${LoginApi.login}`,
      payload
    );
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.baseUrl, user);
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token: number): Observable<UserModel> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<UserModel>(`${this.baseUrl}/me`, {
      headers: httpHeaders,
    });
  }
}
