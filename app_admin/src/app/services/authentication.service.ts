import { Injectable, Inject } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private http: HttpClient
  ) {}

  public getToken(): string {
    return this.storage.getItem('travlr-token') || '';
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    }
    return false;
  }

  public login(user: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/login`, user).pipe(
      tap((authResponse: any) => {
        if (authResponse && authResponse.token) {
          this.saveToken(authResponse.token);
        }
      })
    );
  }
}