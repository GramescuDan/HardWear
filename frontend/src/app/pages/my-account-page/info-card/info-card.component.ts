import {Component, Input, OnInit} from '@angular/core';
import {FF_MINUS} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfoCardComponent implements OnInit {

  constructor() {
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

}
