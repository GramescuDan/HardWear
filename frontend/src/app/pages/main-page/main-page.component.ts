import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../services/item-service";
import {Item} from "../../models/Item";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  itemsList:Item[];

  constructor(private _items: ItemService) {

  }

  ngOnInit(): void {
    this._items.get().subscribe(items =>this.itemsList= items);
    this._items.itemsUpdate(this.itemsList);
  }

}
