import { Routes } from '@angular/router';

import { environment } from './environments/environment';

export const routes: Routes = [

{

path: 'home',

loadComponent: () => import('./app/home/home.component').then(c =>
c.HomeComponent)

},

environment.modules.register ? {

path: 'register',

loadComponent: () => import('./app/register/register.component').then(c=> c.RegisterComponent)

} : { path: 'register', redirectTo:'home'},

environment.modules.register2 ? {

path: 'register2',

loadComponent: () =>
import('./app/register2/register2.component').then(c =>
c.Register2Component)

} : { path: 'register2', redirectTo:'home'},

environment.modules.accounts ? {

path: 'accounts',

loadComponent: () => import('./app/accounts/accounts.component').then(c=> c.AccountsComponent)

} : { path: 'accounts', redirectTo:'home'},

environment.modules.updateaccount ? {

path: 'updateaccount/:id',

loadComponent: () =>
import('./app/update-account/update-account.component').then(c =>
c.UpdateAccountComponent)

} : { path: 'updateaccount', redirectTo:'home'},

environment.modules.contacts ? {

path: 'contacts',

loadComponent: () => import('./app/contacts/contacts.component').then(c=> c.ContactsComponent)

} : { path: 'register', redirectTo:'home'},

environment.modules.addcontact ? {

path: 'addcontact/:account_id',

loadComponent: () =>
import('./app/add-contact/add-contact.component').then(c =>
c.AddContactComponent)

} : { path: 'register', redirectTo:'home'},

{

path: '**',

redirectTo: '/home',

pathMatch: 'full'

}

];