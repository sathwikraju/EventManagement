import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  currentPassword: string = '';
  newPassword: string = '';
  authenticatedUsername: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.authenticatedUsername = authService.getAuthenticatedUsername();
  }

  changePassword(): void {
    const authenticatedUsername = this.authService.getAuthenticatedUsername();

    this.authService
      .updateAdminPassword(authenticatedUsername, this.newPassword)
      .subscribe(
        () => {
          console.log('Password changed successfully!');
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error changing password', error);
        }
      );
  }
}
