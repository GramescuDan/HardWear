import { Component, OnInit } from '@angular/core';
import { ItemsService } from "../../services/items.service";
import { Item } from "../../models/Item";
import { CategoryService } from "../../services/category-service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  itemsList: Item[];
  itemsContainter: Observable<Item[]> = new Observable<Item[]>();
  private actualItems: Item[];

  constructor(private _items: ItemsService, private _categ: CategoryService) {

  }

  ngOnInit(): void {

    this._items.get().subscribe(items => {
      this.itemsList = items;
      this.actualItems = items;
    });
    if (this.itemsList) {
      this._items.itemsUpdate(this.itemsList);
    }
  }

  updateitems($event?: boolean) {

    if (this.itemsList && this.actualItems) {
      this.itemsList = this.actualItems;
      console.log(this.itemsList);
      this.itemsList = this.itemsList.filter(item => {
        return this._categ.categories.every(category => item.categories.includes(category));
      })
    }

  }
}
