import { Component, OnInit } from '@angular/core';
import { CartService } from "../../services/cart-service";
import { AuthSerivce } from "../../services/auth-serivce";
import { firstValueFrom } from "rxjs";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  readonly items$ = this._cartService.items$;

  constructor(private readonly _cartService: CartService, private readonly _auth: AuthSerivce) {
  }

  ngOnInit() {
    return firstValueFrom(this._cartService.loadItems(this._auth.curentUserValue.cart.id));
  }
}
