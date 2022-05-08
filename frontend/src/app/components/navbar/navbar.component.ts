import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  SearchResult ='';
  ngOnInit(): void {
  }
  onKey(event:any):void{
  this.SearchResult =event.target.value;
}
  clearInputField():void{
  this.SearchResult = '';
  }
}
