import { mapToCanActivate, Routes } from '@angular/router';
import { AuthGuard } from './app/auth.guard';
import { environment } from './environments/environment';

export const routes: Routes = [
  { 
    path: 'home', 
    loadComponent: () => import('./app/home/home.component').then(c => c.HomeComponent)
  },
  environment.modules.register ? { 
    path: 'register', 
    loadComponent: () => import('./app/register/register.component').then(c => c.RegisterComponent) 
  } : { path: 'register', redirectTo: 'home' },
  environment.modules.register2 ? { 
    path: 'register2', 
    loadComponent: () => import('./app/register2/register2.component').then(c => c.Register2Component) 
  } : { path: 'register2', redirectTo: 'home' },
  environment.modules.accounts ? { 
    path: 'accounts', 
    loadComponent: () => import('./app/accounts/accounts.component').then(c => c.AccountsComponent), canActivate: mapToCanActivate([AuthGuard]) 
  } : { path: 'accounts', redirectTo: 'home' },
  environment.modules.updateaccount ? { 
    path: 'updateaccount/:id', 
    loadComponent: () => import('./app/update-account/update-account.component').then(c => c.UpdateAccountComponent), canActivate: mapToCanActivate([AuthGuard]) 
  } : { path: 'updateaccount', redirectTo: 'home' },
  environment.modules.contacts ? { 
    path: 'contacts', 
    loadComponent: () => import('./app/contacts/contacts.component').then(c => c.ContactsComponent), canActivate: mapToCanActivate([AuthGuard]) 
  } : { path: 'contacts', redirectTo: 'home' },
  environment.modules.addcontact ? { 
    path: 'add-contact/:account_id', 
    loadComponent: () => import('./app/add-contact/add-contact.component').then(c => c.AddContactComponent), canActivate: mapToCanActivate([AuthGuard]) 
  } : { path: 'add-contact', redirectTo: 'home' },
  { 
    path: 'login',
    loadComponent: () => import('./app/login/login.component').then(c => c.LoginComponent), data: { preload: true } 
  },
  { 
    path: 'user',
    loadComponent: () => import('./app/user/user.component').then(c => c.UserComponent), canActivate: mapToCanActivate([AuthGuard]) 
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
