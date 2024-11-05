import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { Register2Component } from './register2/register2.component';
import { AccountsComponent } from './accounts/accounts.component';
import { UpdateAccountComponent } from './update-account/update-account.component';

const routes: Routes = [
  { path:"", redirectTo:"/home", pathMatch:"full"},
  { path:"register", component:RegisterComponent},
  { path:"register2", component:Register2Component},
  { path:"accounts", component:AccountsComponent},
  { path:"updateaccount/:id", component:UpdateAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
