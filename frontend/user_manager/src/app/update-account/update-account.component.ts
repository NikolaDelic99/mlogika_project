import { Component , AfterViewInit} from '@angular/core';
import { UpdateAccountService } from '../services/update-account.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetAccountsService } from '../services/get-accounts.service';
import { AccountsService } from '../accounts/accounts.service';
import { Account } from '../accounts/Account';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-update-account',
    templateUrl: './update-account.component.html',
    styleUrls: ['./update-account.component.css'],
    imports: [FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatButton, TranslatePipe],
    standalone: true
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
      this.getAccountsService.getAllAccounts();
    }
  }
  }

  

    


