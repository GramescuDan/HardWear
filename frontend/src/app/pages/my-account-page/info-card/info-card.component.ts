import {Component, Input, OnInit} from '@angular/core';
import {FF_MINUS} from "@angular/cdk/keycodes";
import {MatDialog} from "@angular/material/dialog";
import {MyAccountDialogComponent} from "../my-account-dialog/my-account-dialog.component";

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfoCardComponent implements OnInit {

  constructor(private _dia:MatDialog) {
  }

  @Input() headername: string;
  @Input() fitext: string;
  @Input() fires: string;
  @Input() setext: string;
  @Input() seres: string;
  @Input() thtext: string;
  @Input() thres:string;
  ngOnInit(): void {
  }

  openDialog() {
  this._dia.open(MyAccountDialogComponent);
  }
}
