import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ItemDialogComponent} from "../../pages/main-page/item-dialog/item-dialog.component";
import {Item} from "../../models/Item";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {


  @Input() itemContainer:Item;
  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog() {
  this.dialog.open(ItemDialogComponent,{
    data:{
      name:this.itemContainer.name,
      description:this.itemContainer.description,
      price:this.itemContainer.price,
      id:this.itemContainer.id,
      thumbnail:this.itemContainer.thumbnail,
      categories:this.itemContainer.categories,
      quantity:this.itemContainer.quantity
    }
  });
  }
}
