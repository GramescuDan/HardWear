import { Component } from '@angular/core';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  readonly items$ = this._itemsService.get();

  constructor(private readonly _itemsService: ItemsService) {}
}
