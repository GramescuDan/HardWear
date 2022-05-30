import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemDialogComponent } from '../../pages/main-page/item-dialog/item-dialog.component';
import { Item } from '../../models/Item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() itemContainer: Item;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(ItemDialogComponent, {
      data: {
        ...this.itemContainer,
      },
    });
  }
}
