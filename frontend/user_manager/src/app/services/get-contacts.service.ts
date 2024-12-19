import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserManagerResponse } from '../model/UserManagerResponse';
import { Contact } from '../contacts/Contact';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GetContactsService {

  baseUrl = environment.protocol + "//" + environment.host + "/" + environment.root;


  constructor(private http:HttpClient) {}

  getContacts(accountId:number):Observable<UserManagerResponse<Contact>> {
    return this.http.get<UserManagerResponse<Contact>>(`${this.baseUrl + '/getContacts'}?accountId=${accountId}`);

  }

}
