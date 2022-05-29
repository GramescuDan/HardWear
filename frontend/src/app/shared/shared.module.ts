import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from "./item/item.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { MatIconModule } from "@angular/material/icon";
import { CartButtonComponent } from "./cart-button/cart-button.component";
import { IconButtonComponent } from "./user-button/icon-button.component";
import { MatMenuModule } from "@angular/material/menu";


@NgModule({
  declarations: [
    ItemComponent,
    NavbarComponent,
    CartButtonComponent,
    IconButtonComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [
    ItemComponent,
    NavbarComponent,
    CartButtonComponent,
    IconButtonComponent,
  ]
})
export class SharedModule {
}
