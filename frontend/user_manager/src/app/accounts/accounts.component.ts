import { Component, AfterViewInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Account } from './Account';
import { AccountResponse } from '../model/AccountResponse';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements AfterViewInit {
  
  public showedColumns:string[] = ["id","firstname","lastname","username","contact_type","contact_contact"];
  public tableData:Account[]=[];

  constructor(private usersService:UsersService) { }

  ngAfterViewInit(): void {
    this.usersService.getAccounts().subscribe(
      (data:AccountResponse) => {
        console.log(data);
        this.tableData=data.accounts;
      },
      (error) => {
        console.error("Ne dohvata naloge",error);
      }
      )
    
    
  }

}
