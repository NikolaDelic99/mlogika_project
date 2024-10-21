import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';

import { RegisterService } from './register/register.service';
import { Register2Component } from './register2/register2.component';
import { Register2Service } from './register2/register2.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    Register2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [RegisterService,Register2Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
