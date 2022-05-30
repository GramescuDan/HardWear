import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyAccountPageComponent } from './pages/my-account-page/my-account-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { LoginRegisterPageComponent } from './pages/login-register-page/login-register-page.component';
import { LogInCardComponent } from './pages/login-register-page/log-in-card/log-in-card.component';
import { RegisterCardComponent } from './pages/login-register-page/register-card/register-card.component';
import { MainCardComponent } from './pages/login-register-page/main-card/main-card.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { BaseScreenComponent } from './shared/base-screen/base-screen.component';

const routes: Routes = [
  {
    path: '',
    component: BaseScreenComponent,
    children: [
      { path: '', component: MainPageComponent },
      { path: 'my-account', component: MyAccountPageComponent },
      { path: 'cart', component: CartPageComponent },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
      },
    ],
  },
  {
    path: 'login',
    component: LoginRegisterPageComponent,
    children: [
      { path: '', component: MainCardComponent },
      { path: 'login', component: LogInCardComponent },
      { path: 'register', component: RegisterCardComponent },
    ],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
