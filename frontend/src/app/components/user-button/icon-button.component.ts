import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {global} from "@angular/compiler/src/util";
import {GlobalVars} from "../../services/global-vars";

@Component({
  selector: 'app-user-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent implements OnInit{

  constructor(private router: Router) {
    if(GlobalVars.user){
      this.buttonlog = "Log out";
    }
  }
  @Input() Id = ' ';
  @Input() image = ' ';
  @Input() buttonlog = 'Log in';
  menu: any;

  onMyAccountClick() : void{
    if(GlobalVars.user){
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
