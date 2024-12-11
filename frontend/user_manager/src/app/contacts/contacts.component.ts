import { Component, AfterViewInit , OnDestroy } from '@angular/core';
import { AccountsService } from '../accounts/accounts.service';
import { GetContactsService } from '../services/get-contacts.service';
import { Account } from '../accounts/Account';
import { Subscription } from 'rxjs';
import { Contact } from './Contact';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteContactService } from '../services/delete-contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {

  accounts:Account [] = [];
  contacts:Contact[] = [];
  displayedColumns: string[] = ['delete','type', 'contact','primary_contact'];
  subscriptions:Subscription [] = [];

  constructor(private accountService:AccountsService,private getContactService:GetContactsService,private router:Router,private snackBar: MatSnackBar,private deleteContactService:DeleteContactService){}

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

navigateToAddContact() {
  const accountId = this.accounts[0]?.id;
  if(!accountId){
    console.log("Nalog nije izabran!");
    return;
  }
  const url = this.router.createUrlTree(['/add-contact', accountId]).toString();
  this.router.navigate([url]);
}

onDelete(accountId: number): void {
  const snackBarRef = this.snackBar.open("Are you sure?", "OK", {
    duration: 5000,
    panelClass: ["custom-snackbar"],
  });

  snackBarRef.onAction().subscribe(() => {
    console.log("ID = ",accountId);
    const deleteSub = this.deleteContactService.deleteContact(accountId).subscribe(
      () => {
        console.log(`Kontakt sa ID-jem ${accountId} je obrisan.`);
        
         
      },
      (error) => {
        console.error("Greška prilikom brisanja kontakta:", error);
      }
    );
    this.subscriptions.push(deleteSub);
  });
}

 

ngOnDestroy() {
  this.subscriptions.forEach((sub) => sub.unsubscribe());
}


}
