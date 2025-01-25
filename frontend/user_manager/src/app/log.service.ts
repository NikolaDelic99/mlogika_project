import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  handleError(error: HttpErrorResponse): Observable<void> {
    
    console.error('Došlo je do greške:', error);

    
    return of();
  }
}


