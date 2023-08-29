import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessageType: string = '';
  errorMessage: string = '';
  authenticatedUsername: string = '';

  constructor(public authService: AuthService, private router: Router) {}

  login(): void {
    // Call the authentication service to check user credentials
    this.authService.authenticate(this.username, this.password).subscribe(
      (user: any) => {
        const authenticatedUser = user.find(
          (u: any) =>
            u.username === this.username && u.password === this.password
        );

        if (authenticatedUser) {
          this.errorMessageType = 'success';
          this.errorMessage = 'Successful login';
          this.authService.setAuthenticated(true);

          this.authService.setAuthenticatedUsername(this.username);
        } else {
          this.errorMessageType = 'error';
          this.errorMessage = 'Invalid username or password';
        }
      },
      (error) => {
        console.error('Error authenticating user', error);
      }
    );
  }

  proceedToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  changePassword(): void {
    this.router.navigate(['/profile']);
  }
}
