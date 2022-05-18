import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../services/item-service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {


  constructor(private _items: ItemService) { }

  ngOnInit(): void {
    this._items.get().subscribe(x =>this._items.items = x);
  }

}
