import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../model/Account';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private backendUrl = 'http://localhost:8080/api/getAccounts';

  constructor(private http:HttpClient) { }
  
  getAccounts(): Observable<Account[]> {
      return this.http.get<Account[]>(this.backendUrl);
    }
   
}
