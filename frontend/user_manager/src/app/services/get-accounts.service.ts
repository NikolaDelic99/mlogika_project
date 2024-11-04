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
  private subscriptions: Subscription[]=[];

  public firstLoad=true;

  constructor(private accountsService:AccountsService) {
    this.init();
   }

  init(){
    this.getAccountsSubject = new BehaviorSubject<Account[]>(null!);
    this.getAccounts = this.getAccountsSubject.asObservable();
  }

  public getAllAccounts() {
    const getAccountsSub = this.accountsService.getAccounts().subscribe(
      (result: UserManagerResponse<Account>) => {
        if (result.success) {
          this.getAccountsSubject.next(result.items);
        } else {
          console.error("Desila se greška prilikom dohvatanja naloga.");
        }
      },
      (error) => {
        console.error("Greška prilikom dohvatanja naloga:", error);
      }
    );
    this.subscriptions.push(getAccountsSub);
    this.firstLoad = false;
  }

  public deleteAccount(accountId: number): void {
    const deleteSub = this.accountsService.deleteAccount(accountId).subscribe(
      () => {
        console.log(`Nalog sa ID-jem ${accountId} je obrisan.`);
        this.getAllAccounts(); 
      },
      (error) => {
        console.error("Greška prilikom brisanja naloga:", error);
      }
    );
    this.subscriptions.push(deleteSub);
  }

  
  public unsubscribeAll(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
