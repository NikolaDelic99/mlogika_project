import { bootstrapApplication } from '@angular/platform-browser';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { importProvidersFrom, provideExperimentalZonelessChangeDetection} from '@angular/core';

import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient,withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app/app.component';

import { RegisterService } from './app/register/register.service';

import { Register2Service } from './app/register2/register2.service';

import { MAT_DATE_LOCALE } from '@angular/material/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './routes';

import { provideNativeDateAdapter } from '@angular/material/core';

import { provideRouter, withHashLocation, withPreloading} from '@angular/router';

import { AppCustomPreloader } from './routes-loader';

import { provideAnimations } from '@angular/platform-browser/animations';

import { AuthService } from './app/auth.service';

import { AuthInterceptor } from './app/auth.interceptor';


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
    AppCustomPreloader,

    provideExperimentalZonelessChangeDetection(),

    provideRouter(routes, withHashLocation(),
    withPreloading(AppCustomPreloader)),

    provideHttpClient(withInterceptorsFromDi()),

    provideAnimations(),

    importProvidersFrom(
      TranslateModule.forRoot({

        loader: {
        
        provide: TranslateLoader,
        
        useFactory: HttpLoaderFactory,
        
        deps: [HttpClient],
        
        },
        
        }),
    ),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

      AuthService,

      RegisterService,

      Register2Service,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    /*{ provide: DateAdapter, useClass: NativeDateAdapter },*/
    /*{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },*/
    provideNativeDateAdapter()
  ],
}).catch(err => console.error(err));







