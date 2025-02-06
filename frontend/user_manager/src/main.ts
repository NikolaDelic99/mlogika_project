import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { RegisterService } from './app/register/register.service';
import { Register2Service } from './app/register2/register2.service';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { NativeDateAdapter } from '@angular/material/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './routes';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
    timeInput: 'HH:mm',  
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
    timeInput: 'HH:mm',  
    timeOptionLabel: 'HH:mm',  
  },
};

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      CommonModule,
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatButtonModule,
      MatTableModule,
      MatToolbarModule,
      MatIconModule,
      MatSnackBarModule,
      MatMenuModule,
      ReactiveFormsModule,
      MatTooltipModule,
      MatDatepickerModule,
      MatTimepickerModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      BrowserAnimationsModule,
      RouterModule.forRoot(routes),
    ),
    RegisterService,
    Register2Service,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    /*{ provide: DateAdapter, useClass: NativeDateAdapter },*/
    /*{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },*/
    provideNativeDateAdapter(),
    provideHttpClient(),
  ],
}).catch(err => console.error(err));







