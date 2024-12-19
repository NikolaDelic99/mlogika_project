import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Register2Service } from './register2.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetAccountsService } from '../services/get-accounts.service';
import { SharedModule } from '../shared/shared.module';

@Component({
    selector: 'app-register2',
    templateUrl: './register2.component.html',
    styleUrls: ['./register2.component.css'],
    imports: [SharedModule],
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
