import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user-service";
import {firstValueFrom} from "rxjs";
import {IUser} from "../../../models/user";
import {GlobalVars} from "../../../services/global-vars";

@Component({
  selector: 'app-log-in-card',
  templateUrl: './log-in-card.component.html',
  styleUrls: ['./log-in-card.component.css']
})
export class LogInCardComponent implements OnInit {
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

  constructor(private readonly _user:UserService) { }


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

  loginpress():void{

    this._user.post(this.user).subscribe(data => GlobalVars.user = data);
  }
}
