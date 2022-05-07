import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-in-card',
  templateUrl: './log-in-card.component.html',
  styleUrls: ['./log-in-card.component.css']
})
export class LogInCardComponent implements OnInit {

  constructor() { }
  Username = '';
  ngOnInit(): void {
  }

}
