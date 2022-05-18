import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/category-service";

@Component({
  selector: 'app-category-button',
  templateUrl: './category-button.component.html',
  styleUrls: ['./category-button.component.css']
})
export class CategoryButtonComponent implements OnInit {

  pressed: boolean =true;
  @Input() name: String;
  constructor(private _categ: CategoryService) {
}

  onClick(){
    this.pressed = !this.pressed;
    if(this.pressed){
      this._categ.add(this.name.toString());
    }else{
      this._categ.remove(this.name.toString());
    }

  }
  ngOnInit(): void {
  }

}
