import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddContactService {

  private addContactUrl = 'http://localhost:8080/api/addContact';

  constructor(private http:HttpClient) { }

  registerContact(userData:any): Observable<any>{
    return this.http.post<any>(this.addContactUrl,userData);
  }


}
