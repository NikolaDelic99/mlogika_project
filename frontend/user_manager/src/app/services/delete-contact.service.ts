import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DeleteContactService {

  baseUrl = environment.protocol + "//" + environment.host + "/" + environment.root;



  constructor(private http:HttpClient) { }

  deleteContact(accountId:number):Observable<void>{
    return this.http.post<void>(this.baseUrl + '/deleteContact',{"id":accountId.toString()});
  }

}
