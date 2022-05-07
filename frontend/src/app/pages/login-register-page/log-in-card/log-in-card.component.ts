import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user-service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-log-in-card',
  templateUrl: './log-in-card.component.html',
  styleUrls: ['./log-in-card.component.css']
})
export class LogInCardComponent implements OnInit {

  constructor(private readonly _user:UserService) { }
  Username = '';
  Password = '';
  hide: boolean =true;
  ngOnInit(): void {
  }
  onKey(event:any, input:number):void{
    if(input==0){
      this.Username=event.target.value;
    }
    else{
      this.Password=event.target.value;
    }
  }

  async loginpress():Promise<void>{
    let message = {
      useranme: this.Username,
      password: this.Password
    }
    await firstValueFrom(this._user.post(message));
  }
}
