import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import {environment} from "../../environments/environment";

const STORAGE_TOKEN_KEY = 'AuthService:UserToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient) {}

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }

  register(payload): Observable<any> {
    return this.http.post(`${environment.baseURL}/register`, payload).pipe(
      tap(data => {
        localStorage.setItem(STORAGE_TOKEN_KEY, JSON.stringify(data.token));
        this.isLoggedIn = true;
      })
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
