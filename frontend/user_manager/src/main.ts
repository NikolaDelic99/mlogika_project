import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { HttpLoaderFactory } from './app/app.module';
import { RegisterService } from './app/register/register.service';
import { Register2Service } from './app/register2/register2.service';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient, HttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatTableModule, MatToolbarModule, MatIconModule, MatSnackBarModule, ReactiveFormsModule, MatMenuModule, TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }), MatTooltipModule, MatDatepickerModule, MatNativeDateModule),
        RegisterService, Register2Service, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
})
  .catch(err => console.error(err));
