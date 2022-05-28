import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IconButtonComponent } from './components/user-button/icon-button.component';
import { CartButtonComponent } from './components/cart-button/cart-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule } from "@angular/material/badge";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MyAccountPageComponent } from './pages/my-account-page/my-account-page.component';
import { AngularSvgIconModule } from "angular-svg-icon";
import { AppRoutingModule } from "./pages/app.routing";
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { CategoryButtonComponent } from "./pages/main-page/category-button/category-button.component";
import { FooterComponent } from './components/footer/footer.component';
import { MatExpansionModule } from "@angular/material/expansion";
import { LoginRegisterPageComponent } from './pages/login-register-page/login-register-page.component';
import { MatStepperModule } from "@angular/material/stepper";
import { ButtonFullComponent } from './pages/login-register-page/button-full/button-full.component';
import { ButtonOutlineComponent } from './pages/login-register-page/button-outline/button-outline.component';
import { MainCardComponent } from './pages/login-register-page/main-card/main-card.component';
import { LogInCardComponent } from './pages/login-register-page/log-in-card/log-in-card.component';
import { RegisterCardComponent } from './pages/login-register-page/register-card/register-card.component';
import { AuthSerivce } from "./services/auth-serivce";
import { InfoCardComponent } from './pages/my-account-page/info-card/info-card.component';
import { CommonModule } from "@angular/common";
import { ItemDialogComponent } from './pages/main-page/item-dialog/item-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MyAccountDialogComponent } from './pages/my-account-page/my-account-dialog/my-account-dialog.component';
import { SharedModule } from "./shared/shared.module";
import { CartPageComponent } from './pages/cart-page/cart-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IconButtonComponent,
    CartButtonComponent,
    MainPageComponent,
    MyAccountPageComponent,
    NotFoundPageComponent,
    CategoryButtonComponent,
    FooterComponent,
    LoginRegisterPageComponent,
    ButtonFullComponent,
    ButtonOutlineComponent,
    MainCardComponent,
    LogInCardComponent,
    RegisterCardComponent,
    InfoCardComponent,
    ItemDialogComponent,
    MyAccountDialogComponent,
    CartPageComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    FormsModule,
    AngularSvgIconModule,
    AppRoutingModule,
    MatExpansionModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [AuthSerivce],
  exports: [
    ButtonFullComponent,
    ButtonOutlineComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
