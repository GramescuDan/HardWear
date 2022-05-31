import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  readonly items$ = this._cartService.items$;
  itemsSold = false;

  constructor(private readonly _cartService: CartService, private readonly _auth: AuthService) {}

  ngOnInit() {
    return firstValueFrom(this._cartService.loadItems(this._auth.curentUserValue.cart.id));
  }

  deleteItem(id: number) {
    return firstValueFrom(this._cartService.remove(id, this._auth.curentUserValue.cart.id));
  }

  async buy() {
    const items = await firstValueFrom(this.items$);
    // items.forEach(item => this.deleteItem(item.id));
    this.itemsSold = true;
  }
}
