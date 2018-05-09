import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { tap, delay, share } from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {ErrorMsgService} from "src/app/error-msg/error-msg.service";

const STORAGE_TOKEN_KEY = 'AuthService:UserToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient, private errorMsgService: ErrorMsgService) {}

  login(payload): Observable<any> {
    return this.http.post(`${environment.baseURL}/login`, payload).pipe(
      tap((data: any) => {
        localStorage.setItem(STORAGE_TOKEN_KEY, JSON.stringify(data.token));
        this.isLoggedIn = true;
      }, (err) => {
        this.errorMsgService.showErrorMsg(`${err.error.message}. ${err.error.error.errmsg}`);
      }),
      share()
    )
  }

  register(payload): Observable<any> {
    return this.http.post(`${environment.baseURL}/register`, payload).pipe(
      tap((data: any) => {
        localStorage.setItem(STORAGE_TOKEN_KEY, JSON.stringify(data.token));
        this.isLoggedIn = true;
      }, (err) => {
        this.errorMsgService.showErrorMsg(`${err.error.message}. ${err.error.error.errmsg}`);
      }),
      share()
    )
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem(STORAGE_TOKEN_KEY);
  }

  getAuthorizationToken() {
    return localStorage.getItem(STORAGE_TOKEN_KEY);
  }
}
