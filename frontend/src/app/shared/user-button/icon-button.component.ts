import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-user-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css'],
})
export class IconButtonComponent {
  user: IUser;
  @Input() Id = ' ';
  @Input() image = ' ';
  @Input() buttonlog = 'Log in';

  constructor(private router: Router, readonly auth: AuthService) {
    auth.currentUser.subscribe((data: IUser) => (this.user = data));
    if (this.user) {
      this.buttonlog = 'Log out';
    }
  }

  onMyAccountClick() {
    if (this.user) {
      return this.router.navigateByUrl('/my-account');
    }

    return this.router.navigateByUrl('/login');
  }

  onLoginClick() {
    if (this.user) {
      this.auth.logout();
    }

    return this.router.navigateByUrl('/login');
  }
}
