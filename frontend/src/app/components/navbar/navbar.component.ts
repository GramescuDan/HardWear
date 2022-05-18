import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private matIconRegistry: MatIconRegistry,
              private domSanitizer:DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
    "Home",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Home.svg"));
  }

  SearchResult ='';
  ngOnInit(): void {
  }
  onKey(event:any):void{
  this.SearchResult =event.target.value;
}
  clearInputField():void{
  this.SearchResult = '';
  }

  homeButton() {
    this.router.navigate(['/']);
  }
}
