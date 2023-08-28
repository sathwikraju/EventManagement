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
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    // Call the authentication service to check user credentials
    this.authService.authenticate(this.username, this.password).subscribe(
      (user: any) => {
        // Assuming your JSON data has a list of users
        const authenticatedUser = user.find(
          (u: any) =>
            u.username === this.username && u.password === this.password
        );

        if (authenticatedUser) {
          // Set user authentication status
          this.authService.setAuthenticated(true);

          // Navigate to the dashboard or desired route
          this.router.navigate(['/dashboard']);
        } else {
          console.log('Authentication failed.');
          this.errorMessage = 'Invalid username or password';
        }
      },
      (error) => {
        console.error('Error authenticating user', error);
      }
    );
  }
}