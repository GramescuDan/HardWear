import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/category-service";
import {ItemService} from "../../../services/item-service";

@Component({
  selector: 'app-category-button',
  templateUrl: './category-button.component.html',
  styleUrls: ['./category-button.component.css']
})
export class CategoryButtonComponent implements OnInit {

  pressed: boolean =true;
  @Input() name: String;
  constructor(private _categ: CategoryService,private _items: ItemService) {
}

  onClick(){
    this.pressed = !this.pressed;
    if(this.pressed){
      this._categ.add(this.name.toString());
    }else{
      this._categ.remove(this.name.toString());
    }
    this._items.get().subscribe(items =>this._items.itemsUpdate(items));
  }
  ngOnInit(): void {
  }

}
