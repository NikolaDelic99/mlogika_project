import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';

import { RegisterService } from './register/register.service';
import { Register2Component } from './register2/register2.component';
import { Register2Service } from './register2/register2.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule} from "@angular/material/input";
import { MatSelectModule} from "@angular/material/select";
import { MatButtonModule} from "@angular/material/button";
import { AccountsComponent } from './accounts/accounts.component';

import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";


import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { UpdateAccountComponent } from './update-account/update-account.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';

import { MatMenuModule } from "@angular/material/menu";
import { ContactsComponent } from './contacts/contacts.component';
import { AddContactComponent } from './add-contact/add-contact.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LangSwitcherComponent } from './lang-switcher/lang-switcher.component';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}


