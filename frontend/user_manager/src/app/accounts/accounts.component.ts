import { Component, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Account } from './Account';
import { GetAccountsService } from '../services/get-accounts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.css'],
    imports: [SharedModule],
    standalone: true
})
export class AccountsComponent implements AfterViewInit, OnDestroy {
  
  public showedColumns: string[] = ["delete", "id", "firstname", "lastname", "username", "contact_type", "contact_contact"];
  public tableData: MatTableDataSource<any> = new MatTableDataSource();
  private subscriptions: Subscription[] = [];

  public selectedDate: Date | null = null;
  public selectedTime: string | null = null;

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
    this.router.navigate([url]);
  }

  applyFilter(): void {
    if (!this.selectedDate || !this.selectedTime) {
      this.snackBar.open("Please select both date and time!", "OK", { duration: 3000 });
      return;
    }

    console.log("Selected Date:", this.selectedDate);
    console.log("Selected Time:", this.selectedTime);

    const selectedTimestamp = new Date(this.selectedDate);
    
    const [hours, minutes, period] = this.selectedTime.match(/(\d{1,2}):(\d{2}) (AM|PM)/)?.slice(1) || [];
    let hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);

    if (period === "PM" && hour !== 12) {
      hour += 12;  
  } else if (period === "AM" && hour === 12) {
      hour = 0;  
  }

  selectedTimestamp.setHours(hour, minute, 0, 0);

    console.log("Selected timestamp:", selectedTimestamp);

    this.tableData.data = this.tableData.data.filter(account => {
      console.log('Account object:', account);

      console.log('registrationTimestamp:', account.registrationTimestamp);

      if (!account.registrationTimestamp) {
        console.warn("Nalog nema validan registrationTimestamp:", account);
        return false;
      }
      
      const accountTimestamp = new Date(account.registrationTimestamp);
      if (isNaN(accountTimestamp.getTime())) {
        console.warn("Nevalidan datum u account.registrationTimestamp:", account.registrationTimestamp);
        return false;
      }
      
      return accountTimestamp > selectedTimestamp;
    });

    this.changeDetectorRef.detectChanges();
  }
}

