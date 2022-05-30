import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryService } from '../../../services/category-service';
import { ItemsService } from '../../../services/items.service';

@Component({
  selector: 'app-category-button',
  templateUrl: './category-button.component.html',
  styleUrls: ['./category-button.component.css'],
})
export class CategoryButtonComponent implements OnInit {
  pressed: boolean = true;
  @Input() name: string;
  @Output() categoryEmitter = new EventEmitter<boolean>();

  constructor(private _categ: CategoryService, private _items: ItemsService) {}

  onClick() {
    this.pressed = !this.pressed;

    if (!this.pressed) {
      this._categ.add(this.name);
    } else {
      this._categ.remove(this.name);
    }

    this.categoryEmitter.emit(true);
    this._items.load().subscribe(items => this._items.itemsUpdate(items));
  }

  ngOnInit(): void {}
}
