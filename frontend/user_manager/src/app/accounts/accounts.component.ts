import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Account } from './Account';
import { MatTableDataSource } from '@angular/material/table';
import { GetAccountsService } from '../services/get-accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements AfterViewInit {
  
  public showedColumns:string[] = ["id","firstname","lastname","username","contact_type","contact_contact"];
  public tableData:MatTableDataSource<any> = new MatTableDataSource();

  constructor(private getAccountsService: GetAccountsService, private changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.getAccountsService.getAccounts.subscribe(
      (accounts: Account[]) => {
        console.log(accounts);
        this.tableData.data=accounts;
      },
      (error) => {
        console.log("Ne dohvata naloge.",error);
      }
      )

      if(this.getAccountsService.firstLoad){
        this.getAccountsService.getAllAccounts();
      }
      
      this.changeDetectorRef.detectChanges();
    
  
    
    
    
  }

  refreshAccounts() {
    this.getAccountsService.getAllAccounts();
  }

}
