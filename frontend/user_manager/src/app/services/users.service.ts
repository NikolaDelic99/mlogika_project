import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../model/Account';
import { AccountResponse } from '../model/AccountResponse';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private backendUrl = 'http://localhost:8080/api/getAccounts';

  constructor(private http:HttpClient) { }
  
  getAccounts(): Observable<AccountResponse> {
      return this.http.get<AccountResponse>(this.backendUrl);
    }
   
}
