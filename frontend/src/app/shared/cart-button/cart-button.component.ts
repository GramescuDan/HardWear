import { Component, Input } from '@angular/core';
import { ICart } from '../../models/cart';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css'],
})
export class CartButtonComponent {
  readonly items$ = this._cartService.items$;

  cart: ICart;
  @Input() Id = ' ';
  @Input() image = ' ';

  constructor(private readonly _cartService: CartService) {}

  cartPress() {}
}
