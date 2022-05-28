import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { MyAccountPageComponent } from "./my-account-page/my-account-page.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { LoginRegisterPageComponent } from "./login-register-page/login-register-page.component";
import { LogInCardComponent } from "./login-register-page/log-in-card/log-in-card.component";
import { RegisterCardComponent } from "./login-register-page/register-card/register-card.component";
import { MainCardComponent } from "./login-register-page/main-card/main-card.component";
import { CartPageComponent } from "./cart-page/cart-page.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'my-account', component: MyAccountPageComponent},
  {path: 'cart', component: CartPageComponent},
  {
    path: 'login', component: LoginRegisterPageComponent, children: [
      {path: '', component: MainCardComponent},
      {path: 'login', component: LogInCardComponent},
      {path: 'register', component: RegisterCardComponent}
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
  },
  {path: "**", component: NotFoundPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
