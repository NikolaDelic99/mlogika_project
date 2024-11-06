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

  private deteleUrl="http://localhost:8080/api/deleteAccount";

  private getAccountUrl = "http://localhost:8080/api/getAccount";

  private updateUrl = "http://localhost:8080/api/updateAccount";


  constructor(private http:HttpClient) { }

  
  getAccounts(): Observable<UserManagerResponse<Account>> {
      return this.http.get<UserManagerResponse<Account>>(this.backendUrl);
    }

  deleteAccount(accountId:number):Observable<void>{
    return this.http.post<void>(this.deteleUrl,{"id":accountId.toString()});
  }

  getAccount(accountId:number): Observable<UserManagerResponse<Account>> {
    const url = `${this.getAccountUrl}/${accountId}`; 
    return this.http.get<UserManagerResponse<Account>>(url);
  }
  

  updateAccount(account:Account) : Observable<UserManagerResponse<Account>> {
    return this.http.post<UserManagerResponse<Account>> (this.updateUrl,account);
  }
   
}
