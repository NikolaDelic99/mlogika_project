import { mapToCanActivate, Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'home', 
    loadComponent: () => import('./app/home/home.component').then(c => c.HomeComponent)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./app/register/register.component').then(c => c.RegisterComponent)
  },
  { 
    path: 'register2', 
    loadComponent: () => import('./app/register2/register2.component').then(c => c.Register2Component)
  },
  { 
    path: 'accounts', 
    loadComponent: () => import('./app/accounts/accounts.component').then(c => c.AccountsComponent)
  },
  { 
    path: 'updateaccount/:id', 
    loadComponent: () => import('./app/update-account/update-account.component').then(c => c.UpdateAccountComponent)
  },
  { 
    path: 'contacts', 
    loadComponent: () => import('./app/contacts/contacts.component').then(c => c.ContactsComponent)
  },
  { 
    path: 'add-contact/:account_id', 
    loadComponent: () => import('./app/add-contact/add-contact.component').then(c => c.AddContactComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./app/login/login.component').then(c => c.LoginComponent), data: {preload: true}
  },
  {
    path: 'user',
    loadComponent: () => import('./app/user/user.component').then(c => c.UserComponent)
  },
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  }
];