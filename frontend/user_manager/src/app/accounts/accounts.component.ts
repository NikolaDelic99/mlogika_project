import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Account } from './Account';
import { MatTableDataSource } from '@angular/material/table';
import { GetAccountsService } from '../services/get-accounts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements AfterViewInit {
  
  public showedColumns:string[] = ["delete","id","firstname","lastname","username","contact_type","contact_contact"];
  public tableData:MatTableDataSource<any> = new MatTableDataSource();

  constructor(private getAccountsService: GetAccountsService, private changeDetectorRef: ChangeDetectorRef,private snackBar:MatSnackBar,private accountsService:AccountsService) { }

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

  onDelete(accountId:number):void{
    const snackBarRef = this.snackBar.open("Are you sure?","OK",{
      duration:5000,
      panelClass:["custom-snackbar"],
      
    });

  ;
    snackBarRef.onAction().subscribe(()=>{
      this.accountsService.deleteAccount(accountId).subscribe(
        () => {
          console.log(`Nalog sa ID-jem ${accountId} je obrisan.`);
          this.refreshAccounts();
        },
        (error) => {
          console.error("Greška prilikom brisanja naloga:", error);
        }
        );
      
    });
  }

}
