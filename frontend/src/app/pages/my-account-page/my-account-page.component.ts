import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-my-account-page',
  templateUrl: './my-account-page.component.html',
  styleUrls: ['./my-account-page.component.css'],
})
export class MyAccountPageComponent implements OnInit {
  currentUser: IUser;

  constructor(private _auth: AuthService) {
    this._auth.currentUser.subscribe(data => (this.currentUser = data));
  }

  ngOnInit(): void {}
}
