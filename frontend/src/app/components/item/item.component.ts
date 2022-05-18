import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../models/Item";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ItemDialogComponent} from "../../pages/main-page/item-dialog/item-dialog.component";

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
  const dialogConfig = new MatDialogConfig();

  this.dialog.open(ItemDialogComponent,dialogConfig);
  }
}
