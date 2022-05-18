import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-my-account-dialog',
  templateUrl: './my-account-dialog.component.html',
  styleUrls: ['./my-account-dialog.component.css']
})
export class MyAccountDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  fitext: string = this.data.fitext;
  fires: string = this.data.fires;

  setext: string = this.data.setext;
  seres: string = this.data.seres;

  thtext: string = this.data.thtext;
  thres:string = this.data.thres;




  ngOnInit(): void {
  }

}
