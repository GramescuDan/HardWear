import {Component, Input} from '@angular/core';
import {ICart} from "../../models/cart";

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css']
})
export class CartButtonComponent {

  cart: ICart;
  @Input() Id = ' ';
  @Input() image = ' ';

  constructor() {
  }

  cartPress() {

  }
}
