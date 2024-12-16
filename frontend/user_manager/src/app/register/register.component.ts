import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormsModule } from '@angular/forms';
import { RegisterService } from './register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GetAccountsService } from '../services/get-accounts.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    imports: [FormsModule, TranslatePipe]
})
export class RegisterComponent {

  registerForm:FormGroup;
  
  constructor(private fb:FormBuilder,private registerService:RegisterService,private router:Router,private getAccountsService:GetAccountsService) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      contactType: ['', Validators.required],
      contact: ['', Validators.required]
    });
  }
  

  onSubmit(f:NgForm){
    if (f.valid) {
      const newUser = f.value;
      console.log('Sending user data:', newUser);

      
      this.registerService.registerUser(newUser).subscribe(
        response => {
          console.log('User registered:', response);
          this.router.navigate(["/accounts"]);
          this.getAccountsService.getAllAccounts();
        },
        error => {
          console.error('Error registering user:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }

    
  }
}
