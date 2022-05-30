import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { CartButtonComponent } from './cart-button/cart-button.component';
import { IconButtonComponent } from './user-button/icon-button.component';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { BaseScreenComponent } from './base-screen/base-screen.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ItemComponent,
    NavbarComponent,
    CartButtonComponent,
    IconButtonComponent,
    BaseScreenComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    MatBadgeModule,
    MatButtonModule,
  ],
  exports: [ItemComponent, NavbarComponent, CartButtonComponent, IconButtonComponent],
})
export class SharedModule {}
