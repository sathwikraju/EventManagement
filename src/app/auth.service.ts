import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:4000';
  private authenticated = false;

  constructor(private http: HttpClient) {}

  authenticate(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/admins`;
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error during authentication', error);
        return throwError('Error during authentication');
      })
    );
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  setAuthenticated(value: boolean): void {
    this.authenticated = value;
  }
}
