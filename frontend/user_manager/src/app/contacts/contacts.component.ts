import { Component, AfterViewInit , OnDestroy } from '@angular/core';
import { AccountsService } from '../accounts/accounts.service';
import { GetContactsService } from '../services/get-contacts.service';
import { Account } from '../accounts/Account';
import { Subscription } from 'rxjs';
import { Contact } from './Contact';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {

  accounts:Account [] = [];
  contacts:Contact[] = [];
  displayedColumns: string[] = ['type', 'contact'];
  subscriptions:Subscription [] = [];

  constructor(private accountService:AccountsService,private getContactService:GetContactsService){}

  ngAfterViewInit() : void {
    const accountsSub = this.accountService.getAccounts().subscribe(
      (result) => {
        if(result.success){
          this.accounts = result.items;
        }
        else {
          console.error("Greska prilikom dohvatanja naloga");
        }
      } , 
      (error) =>{
        console.error("Desila se greska prilikom dohvatanja naloga:",error);
      }
      );
    this.subscriptions.push(accountsSub);
  }

  onAccountClicked(accountId: number) {
    
    const contactsSub = this.getContactService.getContacts(accountId).subscribe(
        (result) => {
          if(result.success){
            this.contacts = result.items;
          }
          else{
            console.error("Greska prilikom dohvatanja kontakta");
          } 
        } ,
        (error) => {
          console.error("Desila se greska prilikom dohvatanja kontakta:",error);
        }
        
      );
      this.subscriptions.push(contactsSub);

}

ngOnDestroy() {
  this.subscriptions.forEach((sub) => sub.unsubscribe());
}


}
