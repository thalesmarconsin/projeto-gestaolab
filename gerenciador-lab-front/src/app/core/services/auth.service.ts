import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = environment.apiRoot;
  private tokenKey = 'token';
  private userKey = 'currentUser'; // Chave para armazenar o usuário no localStorage

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<{ token: string; user: User }> {
    return this.http.post<{ token: string; user: User }>(this.api + 'login', data).pipe(
      tap(res => {
        localStorage.setItem(this.tokenKey, res.token);
        this.setCurrentUser(res.user); // Armazena o usuário ao fazer login
      })
    );
  }

  register(data: { name: string; email: string; password: string }): Observable<User> {
    return this.http.post<User>(this.api + 'register', data).pipe(
      tap(user => {
        // Opcional: logar automaticamente após o registro
        this.setCurrentUser(user);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(this.api + 'logout', {}).pipe(
      tap(() => {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey); // Remove o usuário ao fazer logout
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Método para obter o usuário logado
  getUsuarioLogado(): User | null {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  // Método para atualizar os dados do usuário logado
  updateCurrentUser(user: Partial<User>): void {
    const currentUser = this.getUsuarioLogado();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...user };
      this.setCurrentUser(updatedUser);
    }
  }

  // Método privado para armazenar o usuário
  private setCurrentUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      nome: user.name // Mantendo compatibilidade com 'nome'
    }));
  }
}