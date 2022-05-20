import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AuthSerivce} from "../../../services/auth-serivce";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IUser} from "../../../models/user";

@Component({
  selector: 'app-my-account-dialog',
  templateUrl: './my-account-dialog.component.html',
  styleUrls: ['./my-account-dialog.component.css']
})
export class MyAccountDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _auth: AuthSerivce, private formBuilder: FormBuilder) {
  }

  fitext: string = this.data.var1;
  fires: string = this.data.var1val;

  setext: string = this.data.var2;
  seres: string = this.data.var2val;

  thtext: string = this.data.var3;
  thres: string = this.data.var3val;

  select: boolean = this.data.selector;

  updateForm: FormGroup;

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group(
      {
        fir: this.fires,
        sec: this.seres,
        th: this.thres
      })

    this.updateForm.valueChanges.subscribe()
  }

  pressSave() {
    let user: IUser;
    user = this._auth.curentUserValue;
    if (this.select) {
      //Post
      user.username = this.updateForm.get('fir')?.value;
      user.email = this.updateForm.get('sec')?.value;
      user.phone = this.updateForm.get('th')?.value;

    } else {
      user.firstName = this.updateForm.get('fir')?.value;
      user.lastName = this.updateForm.get('sec')?.value;
      user.location = this.updateForm.get('th')?.value;
    }
    this._auth.update(user);
  }

}
