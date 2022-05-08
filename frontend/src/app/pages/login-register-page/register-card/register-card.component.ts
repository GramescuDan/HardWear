import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../models/user";
import {UserService} from "../../../services/user-service";
import {Router} from "@angular/router";
import {GlobalVars} from "../../../services/global-vars";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
    role: "client",
    username: ""
  };

  hide: boolean =true;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;

  constructor(private readonly _user:UserService,private router: Router,private _formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.forthFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
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
  nextpress():void{

  }

}
