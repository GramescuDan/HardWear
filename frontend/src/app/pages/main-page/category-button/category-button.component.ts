import {Component, Input, OnInit} from '@angular/core';
import {ICategory} from "../../../models/category";

@Component({
  selector: 'app-category-button',
  templateUrl: './category-button.component.html',
  styleUrls: ['./category-button.component.css']
})
export class CategoryButtonComponent implements OnInit {

  pressed: boolean =true;
  @Input() name: String | undefined;
  constructor() {
}

  onClick(){
    this.pressed = !this.pressed;
  }
  ngOnInit(): void {
  }

}
