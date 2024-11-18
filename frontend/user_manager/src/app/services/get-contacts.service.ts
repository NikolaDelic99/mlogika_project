import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserManagerResponse } from '../model/UserManagerResponse';
import { Contact } from '../contacts/Contact';

@Injectable({
  providedIn: 'root'
})
export class GetContactsService {

  private getContactsUrl = 'http://localhost:8080/api/getContacts';

  constructor(private http:HttpClient) {}

  getContacts(accountId:number):Observable<UserManagerResponse<Contact>> {
    return this.http.get<UserManagerResponse<Contact>>(`${this.getContactsUrl}?accountId=${accountId}`);

  }

}
