import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../models/user";
import {UserService} from "../../../services/user-service";
import {Router} from "@angular/router";
import {GlobalVars} from "../../../services/global-vars";

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css']
})
export class RegisterCardComponent implements OnInit {
  user: IUser ={
    email: "",
    first_name: "",
    id: 0,
    last_name: "",
    localdate: new Date,
    password: "",
    phone: "",
    role: "",
    username: ""
  };

  hide: boolean =true;

  constructor(private readonly _user:UserService,private router: Router) { }


  ngOnInit(): void {
  }
  onKey(event:any, input:number):void{
    if(input==0){
      this.user.username=event.target.value;
    }
    else{
      this.user.password=event.target.value;
    }
  }

  registerpress():void{

    this._user.register(this.user).subscribe(data =>{
        GlobalVars.user = data;
        this.router.navigateByUrl('');
      }, error => alert('login failed!')
    );
  }
}
