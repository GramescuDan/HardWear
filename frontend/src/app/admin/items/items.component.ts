import { Component } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  readonly items$ = this._itemsService.items$;

  constructor(private readonly _itemsService: ItemsService) {}

  deleteItem(id: number) {
    return firstValueFrom(this._itemsService.delete(id));
  }
}
