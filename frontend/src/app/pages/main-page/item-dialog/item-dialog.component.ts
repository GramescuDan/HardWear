import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../../../models/Item';
import { AuthService } from '../../../services/auth.service';
import { IUser } from '../../../models/user';
import { CartService } from '../../../services/cart-service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css'],
})
export class ItemDialogComponent implements OnInit {
  userFav: IUser;
  favoriteButton: string = 'Add to favorites';
  buttonPressed: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Item,
    readonly auth: AuthService,
    private readonly _cartService: CartService,
  ) {}

  ngOnInit(): void {
    console.log(this.auth.curentUserValue);
    this.userFav = this.auth.curentUserValue;
    if (this.userFav.favouriteItems == undefined) {
      this.userFav.favouriteItems = [];
    }

    this.buttonPressed = this.userFav.favouriteItems.some(item => item.id === this.data.id);

    if (this.buttonPressed) {
      this.favoriteButton = 'Remove from favorites';
    } else {
      this.favoriteButton = 'Add to favorites';
    }
  }

  async favPress() {
    if (!this.buttonPressed) {
      this.favoriteButton = 'Remove from favorites';
      this.buttonPressed = true;

      this.userFav.favouriteItems.push(this.data);
      await this.auth.saveFav(this.data.id);
    } else {
      this.favoriteButton = 'Add to favorites';
      this.buttonPressed = false;

      await this.auth.removeFav(this.data.id);
    }
    this.userFav = this.auth.curentUserValue;
  }

  addToCart() {
    return firstValueFrom(this._cartService.add(this.data, this.auth.curentUserValue.cart.id));
  }
}
