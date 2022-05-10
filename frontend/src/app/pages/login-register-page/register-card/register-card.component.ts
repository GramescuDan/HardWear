import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../models/user";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthSerivce} from "../../../services/auth-serivce";

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css']
})
export class RegisterCardComponent implements OnInit {

  user:IUser = new IUser();

  hide: boolean =true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;

  constructor(private readonly _user:AuthSerivce,private router: Router,private _formBuilder: FormBuilder) { }


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

  registerpress():void{
  this._user.register(this.user);
  }

}
