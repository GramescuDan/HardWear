import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent implements OnInit{

  constructor(private router: Router) {
  }
  @Input() Id = ' ';
  @Input() image = ' ';
  menu: any;

  onMyAccountClick() : void{
//this.router.navigateByUrl("/my-account");
  }

  ngOnInit(): void {
  }
}
