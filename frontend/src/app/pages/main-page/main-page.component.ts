import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../services/category-service";
import {ICategory} from "../../models/category";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

}
