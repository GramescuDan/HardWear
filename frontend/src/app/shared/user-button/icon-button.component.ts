import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthSerivce} from "../../services/auth-serivce";
import {IUser} from "../../models/user";

@Component({
  selector: 'app-user-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent implements OnInit {

  constructor(private router: Router, private _auth: AuthSerivce) {
    _auth.currentUser.subscribe((data: IUser) => this.user = data);
    if (this.user) {
      this.buttonlog = "Log out";
    }
  }

  user: IUser;
  @Input() Id = ' ';
  @Input() image = ' ';
  @Input() buttonlog = 'Log in';
  menu: any;

  onMyAccountClick(): void {
    if (this.user) {
      console.log(this.user);
      this.router.navigateByUrl('/my-account');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  onLoginClick(): void {
    if(this.user){
      this._auth.logout();}
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
  }
}
