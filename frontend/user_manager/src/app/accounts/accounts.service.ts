import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './Account';
import { UserManagerResponse } from '../model/UserManagerResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  

  baseUrl = environment.protocol + "//" + environment.host + "/" + environment.root;


  constructor(private http:HttpClient) { }

  
  getAccounts(): Observable<UserManagerResponse<Account>> {
      return this.http.get<UserManagerResponse<Account>>(this.baseUrl+'/getAccounts');
    }

  deleteAccount(accountId:number):Observable<void>{
    return this.http.post<void>(this.baseUrl+'/deleteAccount',{"id":accountId.toString()});
  }

  getAccount(accountId:number): Observable<UserManagerResponse<Account>> {

    const url = `${this.baseUrl+'/getAccount'}/${accountId}`;

    return this.http.get<UserManagerResponse<Account>>(url);
  }
  

  updateAccount(account:Account) : Observable<UserManagerResponse<Account>> {
    return this.http.post<UserManagerResponse<Account>> (this.baseUrl+'/updateAccount',account);
  }
   
}
