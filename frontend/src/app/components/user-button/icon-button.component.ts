import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthSerivce} from "../../services/auth-serivce";

@Component({
  selector: 'app-user-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent implements OnInit{

  constructor(private router: Router, private _auth:AuthSerivce) {
    if(_auth.currentUser){
      this.buttonlog = "Log out";
    }
  }
  @Input() Id = ' ';
  @Input() image = ' ';
  @Input() buttonlog = 'Log in';
  menu: any;

  onMyAccountClick() : void{
    if(this._auth.currentUser){
      this.router.navigateByUrl('/my-account');
    }else{
      this.router.navigateByUrl('/login');
    }
  }

  onLoginClick():void{
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
  }
}
