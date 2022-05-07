import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MyAccountPageComponent} from "./my-account-page/my-account-page.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {NotFoundPageComponent} from "./not-found-page/not-found-page.component";
import {LoginRegisterPageComponent} from "./login-register-page/login-register-page.component";

const routes: Routes = [
  {path:'my-account', component: MyAccountPageComponent},
  {path:'', component:MainPageComponent},
  {path:'login', component:LoginRegisterPageComponent},
  {path:"**", component:NotFoundPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
