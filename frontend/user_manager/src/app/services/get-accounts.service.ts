import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription , throwError } from 'rxjs';
import { Account } from '../accounts/Account';
import { AccountsService } from '../accounts/accounts.service';
import { UserManagerResponse } from '../model/UserManagerResponse';
import { map, catchError } from 'rxjs/operators';

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

  public getSingleAccount(accountId: number): Observable<Account> {
    return this.accountsService.getAccount(accountId).pipe(
      map((result: UserManagerResponse<Account>) => {
        if (result.success && result.items.length > 0) {
          return result.items[0]; // vraća prvi element u nizu
        } else {
          throw new Error("Greška prilikom dohvatanja naloga");
        }
      }),
      catchError((error) => {
        console.error("Greška prilikom dohvatanja jednog naloga:", error);
        return throwError(error);
      })
    );
  }
  

  public updateAccount(account: Account): void {
    const updateSub = this.accountsService.updateAccount(account).subscribe(
      (result: UserManagerResponse<Account>) => {
        if (result.success) {
          console.log("Nalog je uspešno ažuriran:", result.items);
          this.getAllAccounts(); 
        } else {
          console.error("Greška prilikom ažuriranja naloga.");
        }
      },
      (error) => {
        console.error("Greška prilikom ažuriranja naloga:", error);
      }
    );
    this.subscriptions.push(updateSub);
  }
  

  
  public unsubscribeAll(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
