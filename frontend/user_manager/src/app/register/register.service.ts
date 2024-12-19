import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  

  baseUrl = environment.protocol + "//" + environment.host + "/" + environment.root;

  constructor(private http:HttpClient) { }

  registerUser(userData:any): Observable<any>{
    return this.http.post<any>(this.baseUrl + '/addAccount',userData);
  }
}
