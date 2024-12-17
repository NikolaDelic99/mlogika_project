import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Register2Service } from './register2.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GetAccountsService } from '../services/get-accounts.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-register2',
    templateUrl: './register2.component.html',
    styleUrls: ['./register2.component.css'],
    imports: [FormsModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatButton, TranslatePipe],
    standalone: true
})
export class Register2Component {

  registerForm:FormGroup;
  
  constructor(private fb:FormBuilder,private registerService:Register2Service,private router:Router,private getAccountsService:GetAccountsService) {
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
