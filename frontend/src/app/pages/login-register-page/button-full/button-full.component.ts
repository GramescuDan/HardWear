import { Component, Input, OnInit } from '@angular/core';
import { FF_MINUS } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-button-full',
  templateUrl: './button-full.component.html',
  styleUrls: ['./button-full.component.css'],
})
export class ButtonFullComponent implements OnInit {
  @Input() text: String | undefined;

  constructor() {}

  ngOnInit(): void {}
}
