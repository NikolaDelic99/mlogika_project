import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './app/auth.service';
import { inject } from '@angular/core';

export class AppCustomPreloader implements PreloadingStrategy {

        private authService = inject(AuthService);

        preload(route: Route, load: Function): Observable<any> {
                return route.data && route.data['preload'] ? load() : of(null);
        }
}