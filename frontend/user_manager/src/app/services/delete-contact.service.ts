import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteContactService {

  private deteleContactUrl="http://localhost:8080/api/deleteContact";


  constructor(private http:HttpClient) { }

  deleteContact(accountId:number):Observable<void>{
    return this.http.post<void>(this.deteleContactUrl,{"id":accountId.toString()});
  }

}
