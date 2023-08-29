import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/admins';
  private authenticated = false;
  private authenticatedUsername: string = '';

  constructor(private http: HttpClient) {}

  authenticate(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error during authentication', error);
        return throwError('Error during authentication');
      })
    );
  }

  updateAdminPassword(username: string, newPassword: string): Observable<any> {
    const url = `${this.apiUrl}/?username=${username}`;

    return this.http.get(url).pipe(
      switchMap((admins: any) => {
        if (admins.length > 0) {
          const adminToUpdate = admins[0];
          adminToUpdate.password = newPassword;

          const updateUrl = `${this.apiUrl}/${adminToUpdate.id}`;

          return this.http.put(updateUrl, adminToUpdate);
        } else {
          return throwError('Admin not found');
        }
      }),
      catchError((error) => {
        console.error('Error updating password', error);
        return throwError('Error updating password');
      })
    );
  }

  // changePassword(
  //   username: string,
  //   currentPassword: string,
  //   newPassword: string
  // ): Observable<any> {
  //   const url = `${this.apiUrl}/admins`; // Adjust this URL based on your backend API
  //   const body = {
  //     username: username,
  //     currentPassword: currentPassword,
  //     newPassword: newPassword,
  //   };
  //   return this.http.post(url, body);
  // }

  fetchAdminByUsername(username: string): Observable<any> {
    const params = new HttpParams().set('username', username);

    return this.http
      .get<any>(this.apiUrl, { params })
      .pipe(
        map((admins) =>
          admins.find((admin: any) => admin.username === username)
        )
      );
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getAuthenticatedUsername(): string {
    return this.authenticatedUsername;
  }

  setAuthenticatedUsername(username: string): void {
    this.authenticatedUsername = username;
  }

  setAuthenticated(value: boolean): void {
    this.authenticated = value;
  }
}
