import { Component } from '@angular/core';
import {IUser} from "./models/user";
import {AuthSerivce} from "./services/auth-serivce";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: IUser;
  title = 'frontend';
  constructor(private _auth: AuthSerivce) {
    this._auth.currentUser.subscribe(x=>this.currentUser = x);
  }
}


