import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthSerivce} from "../../../services/auth-serivce";

@Component({
  selector: 'app-log-in-card',
  templateUrl: './log-in-card.component.html',
  styleUrls: ['./log-in-card.component.css']
})
export class LogInCardComponent implements OnInit {

  username: string;
  password: string;
  hide: boolean =true;

  constructor(private readonly _auth:AuthSerivce,private router: Router) { }


  ngOnInit(): void {

  }

  loginpress():void{
  this._auth.login(this.username,this.password);
  }

}
