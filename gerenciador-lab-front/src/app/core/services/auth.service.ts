import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = environment.apiRoot;
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<{ token: string; user: User }> {
    return this.http.post<{ token: string; user: User }>(this.api + 'login', data).pipe(
      tap(res => localStorage.setItem(this.tokenKey, res.token))
    );
  }

  register(data: { name: string; email: string; password: string }): Observable<User> {
    return this.http.post<User>(this.api + 'register', data);
  }

  logout(): Observable<any> {
    return this.http.post(this.api + 'logout', {}).pipe(
      tap(() => localStorage.removeItem(this.tokenKey))
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
