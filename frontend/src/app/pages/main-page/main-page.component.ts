import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../services/category-service";
import {ICategory} from "../../models/category";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  categories: ICategory[] | undefined;


  constructor(private readonly _category : CategoryService) { }

  ngOnInit(): void {
    this._category.get().subscribe(categories => this.categories = categories)
  }

}
