import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  readonly items$ = this._itemsService.get();

  constructor(private readonly _itemsService: ItemsService) {}

  ngOnInit(): void {}
}
