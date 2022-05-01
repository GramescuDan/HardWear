import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IconButtonComponent } from './components/user-button/icon-button.component';
import { CartButtonComponent } from './components/cart-button/cart-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatBadgeModule} from "@angular/material/badge";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IconButtonComponent,
    CartButtonComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatBadgeModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
