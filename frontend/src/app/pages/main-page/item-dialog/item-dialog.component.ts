import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Item} from "../../../models/Item";

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css']
})
export class ItemDialogComponent implements OnInit {

  item : Item;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    this.item.name = this.data.name;
    this.item.price = this.data.price;
    this.item.description = this.data.description;
    this.item.id= this.data.id;
    this.item.quantity = this.data.quantity;
    this.item.categories = this.data.categories;
    console.log(this.data);
  }

}
