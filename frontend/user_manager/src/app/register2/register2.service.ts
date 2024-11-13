import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Register2Service {

  private backendUrl = 'http://localhost:8080/api/addAccount';

  constructor(private http:HttpClient) { }

  registerUser(userData:any): Observable<any>{
    return this.http.post<any>(this.backendUrl,userData);
  }
}
