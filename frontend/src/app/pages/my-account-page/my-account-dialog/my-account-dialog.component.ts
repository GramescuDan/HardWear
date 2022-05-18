import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-account-dialog',
  templateUrl: './my-account-dialog.component.html',
  styleUrls: ['./my-account-dialog.component.css']
})
export class MyAccountDialogComponent implements OnInit {

  constructor() { }

  @Input() fitext: string;
  @Input() fires: string;

  @Input() setext: string;
  @Input() seres: string;

  @Input() thtext: string;
  @Input() thres:string;




  ngOnInit(): void {
  }

}
