import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-my-account-dialog',
  templateUrl: './my-account-dialog.component.html',
  styleUrls: ['./my-account-dialog.component.css']
})
export class MyAccountDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  fitext: string = this.data.var1;
  fires: string = this.data.var1val;

  setext: string = this.data.var2;
  seres: string = this.data.var2val;

  thtext: string = this.data.var3;
  thres:string = this.data.var3val;




  ngOnInit(): void {
    console.log(this.data);
  }

}
