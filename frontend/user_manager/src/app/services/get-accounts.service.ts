import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Account } from '../accounts/Account';
import { AccountsService } from '../accounts/accounts.service';
import { UserManagerResponse } from '../model/UserManagerResponse';

@Injectable({
  providedIn: 'root'
})
export class GetAccountsService {

  private getAccountsSubject!: BehaviorSubject<Account[]>;
  public getAccounts!: Observable<Account[]>;
  subscription: Subscription[]=[];

  public firstLoad=true;

  constructor(private accountsService:AccountsService) {
    this.init();
   }

  init(){
    this.getAccountsSubject = new BehaviorSubject<Account[]>(null!);
    this.getAccounts = this.getAccountsSubject.asObservable();
  }

  public getAllAccounts() {
    const getAccounts = this.accountsService.getAccounts();
    this.subscription.push(getAccounts.subscribe(
      (result:UserManagerResponse<Account>) => {
        console.log("Data",result);
        if(result.success){
          this.getAccountsSubject.next(result.items);
        }
        else {
          console.error("Desila se greska.");
        }
      },
      (error) => {
        console.error("Ne dohvata naloge.",error);
      }
    ))

    console.log("Pozvan");

    this.firstLoad=false;
  }
}
