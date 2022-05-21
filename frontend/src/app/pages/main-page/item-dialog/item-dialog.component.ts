import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Item} from "../../../models/Item";
import {AuthSerivce} from "../../../services/auth-serivce";
import {IUser} from "../../../models/user";

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css']
})
export class ItemDialogComponent implements OnInit {

  userFav: IUser;
  itemDialog: Item;
  favoriteButton: string = "Add to favorites";
  buttonPressed : boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _auth: AuthSerivce) {

  }

  ngOnInit(): void {
    console.log(this._auth.curentUserValue);
    this.itemDialog = this.data;
    this.userFav = this._auth.curentUserValue;
    if(this.userFav.favouriteItems == undefined){
      this.userFav.favouriteItems = [];
    }

    this.buttonPressed = this.userFav.favouriteItems.includes(this.itemDialog);

    if (this.buttonPressed) {
      this.favoriteButton = "Remove from favorites";
    } else {
      this.favoriteButton = "Add to favorites";
    }
  }

  favPress() {

    if (!this.buttonPressed) {
      this.favoriteButton = "Remove from favorites";
      this.buttonPressed = true;

       this.userFav.favouriteItems.push(this.itemDialog);
       this._auth.saveFav(this.itemDialog.id);

    } else {
      this.favoriteButton = "Add to favorites";
      this.buttonPressed = false;

      this._auth.removeFav(this.itemDialog.id);
    }

  }

}
