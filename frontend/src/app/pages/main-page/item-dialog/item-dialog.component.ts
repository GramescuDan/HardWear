import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Item } from "../../../models/Item";
import { AuthSerivce } from "../../../services/auth-serivce";
import { IUser } from "../../../models/user";
import { CartService } from "../../../services/cart-service";
import { firstValueFrom } from "rxjs";

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css']
})
export class ItemDialogComponent implements OnInit {

  userFav: IUser;
  favoriteButton: string = "Add to favorites";
  buttonPressed: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Item, private _auth: AuthSerivce, private readonly _cartService: CartService) {

  }

  ngOnInit(): void {
    console.log(this._auth.curentUserValue);
    this.userFav = this._auth.curentUserValue;
    if (this.userFav.favouriteItems == undefined) {
      this.userFav.favouriteItems = [];
    }

    this.buttonPressed = this.userFav.favouriteItems.some(item => item.id === this.data.id);

    if (this.buttonPressed) {
      this.favoriteButton = "Remove from favorites";
    } else {
      this.favoriteButton = "Add to favorites";
    }
  }

  async favPress() {
    if (!this.buttonPressed) {
      this.favoriteButton = "Remove from favorites";
      this.buttonPressed = true;

      this.userFav.favouriteItems.push(this.data);
      await this._auth.saveFav(this.data.id);
    } else {
      this.favoriteButton = "Add to favorites";
      this.buttonPressed = false;

      await this._auth.removeFav(this.data.id);
    }
    this.userFav = this._auth.curentUserValue
  }

  addToCart() {
    return firstValueFrom(this._cartService.add(this.data, this._auth.curentUserValue.cart.id))
  }
}
