import { Component } from '@angular/core';
import { CartService } from "../../services/cart-service";
import { AuthSerivce } from "../../services/auth-serivce";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  readonly items$ = this._cartService.get(this._auth.curentUserValue.cart.id);

  constructor(private readonly _cartService: CartService, private readonly _auth: AuthSerivce) {
  }
}
