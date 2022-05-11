import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfoCardComponent implements OnInit {

  constructor() {
  }

  @Input() headername: String;
  @Input() fitext: String;
  @Input() setext: String;
  @Input() thtext: String;
  ngOnInit(): void {
  }

}
