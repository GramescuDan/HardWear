import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css']
})
export class CartButtonComponent {

  @Input() Id = ' ';
  @Input() image = ' ';

}
