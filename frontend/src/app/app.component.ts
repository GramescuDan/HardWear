import { Component } from '@angular/core';
import { IUser } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentUser: IUser;
  title = 'frontend';

  constructor(private _auth: AuthService) {
    this._auth.currentUser.subscribe(x => (this.currentUser = x));
  }
}
