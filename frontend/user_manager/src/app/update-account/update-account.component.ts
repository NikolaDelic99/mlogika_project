import { Component , AfterViewInit} from '@angular/core';
import { UpdateAccountService } from '../services/update-account.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GetAccountsService } from '../services/get-accounts.service';
import { AccountsService } from '../accounts/accounts.service';
import { Account } from '../accounts/Account';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements AfterViewInit{
  
  
  accountForm:FormGroup;

  constructor(private route:ActivatedRoute, private getAccountsService:GetAccountsService,private fb:FormBuilder,private router:Router){
    this.accountForm=this.fb.group({
      id : [{value : "", readonly:true},Validators.required],
      firstname: ["",Validators.required],
      lastname: ["",Validators.required],
      username: ["",Validators.required],
      password: ["",Validators.required],
      contact_type: ["",Validators.required],
      contact_contact: ["",Validators.required]
    });
  }

  
  



  

  ngAfterViewInit(): void {
    const accountId = this.route.snapshot.paramMap.get('id');
    
    

    if (accountId) {
      
      this.getAccountsService.getSingleAccount(+accountId).subscribe(
        (account: Account) => {
          this.accountForm?.patchValue(account);
        },
        (error) => {
          console.error('Greška prilikom dohvatanja podataka o nalogu:', error);
        }
      );
    }
  }

  onSubmit() : void{
    if (this.accountForm?.valid) {
      
      this.getAccountsService.updateAccount(this.accountForm.value);
      this.router.navigate(["/accounts"]);
    }
  }
  }

  

    


