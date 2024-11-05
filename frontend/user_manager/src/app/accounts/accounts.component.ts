import { Component, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Account } from './Account';
import { MatTableDataSource } from '@angular/material/table';
import { GetAccountsService } from '../services/get-accounts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements AfterViewInit, OnDestroy {
  
  public showedColumns: string[] = ["delete", "id", "firstname", "lastname", "username", "contact_type", "contact_contact"];
  public tableData: MatTableDataSource<any> = new MatTableDataSource();
  private subscriptions: Subscription[] = [];

  constructor(
    private getAccountsService: GetAccountsService,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private router:Router,
    private location:Location
  ) { }

  ngAfterViewInit(): void {
    const getAccountsSub = this.getAccountsService.getAccounts.subscribe(
      (accounts: Account[]) => {
        this.tableData.data = accounts;
      },
      (error) => {
        console.error("Greška prilikom dohvatanja naloga:", error);
      }
    );
    this.subscriptions.push(getAccountsSub);

    if (this.getAccountsService.firstLoad) {
      this.getAccountsService.getAllAccounts();
    }
    this.changeDetectorRef.detectChanges();
  }

  
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  refreshAccounts(): void {
    this.getAccountsService.getAllAccounts();
  }

  onDelete(accountId: number): void {
    const snackBarRef = this.snackBar.open("Are you sure?", "OK", {
      duration: 5000,
      panelClass: ["custom-snackbar"],
    });

    snackBarRef.onAction().subscribe(() => {
      this.getAccountsService.deleteAccount(accountId);
    });
  }

  onUpdateClick(accountId:number): void {
    const url = this.router.createUrlTree(['/updateaccount', accountId]).toString();
    this.location.go(url);
  }
}
