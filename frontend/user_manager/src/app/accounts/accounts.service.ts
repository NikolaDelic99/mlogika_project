import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './Account';
import { UserManagerResponse } from '../model/UserManagerResponse';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private backendUrl = 'http://localhost:8080/api/getAccounts';

  constructor(private http:HttpClient) { }
  
  getAccounts(): Observable<UserManagerResponse<Account>> {
      return this.http.get<UserManagerResponse<Account>>(this.backendUrl);
    }
   
}
