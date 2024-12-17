import { Component } from '@angular/core';
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { AddContactService } from '../services/add-contact.service';
import { ActivatedRoute } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-add-contact',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact.component.css'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatButton, TranslatePipe]
})
export class AddContactComponent {

  registerForm:FormGroup;

  accountId = this.route.snapshot.paramMap.get('account_id') || '';
  

 

  constructor(private fb:FormBuilder,private addContactService:AddContactService,private router:Router,private route:ActivatedRoute) {
    console.log(this.accountId);
    this.registerForm = this.fb.group({
      account_id: [this.accountId || '',Validators.required],
      type: ['', Validators.required],
      contact: ['', [Validators.required]],
      primary_contact: ['', [Validators.required]]
    });
  }

  onSubmit(f:FormGroup){
    if (f.valid) {
      const newContact = {
        account_id: Number(f.value.account_id),
        type: f.value.type,
        contact: f.value.contact,
        primary_contact: f.value.primary_contact === 'true' || f.value.primary_contact === true
      };
      console.log('Sending contact data:', newContact);

      
      this.addContactService.registerContact(newContact).subscribe(
        response => {
          console.log('Contact registered:', response);
          this.router.navigate(["/contacts"]);
        },
        error => {
          console.error('Error registering contact:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }

  }

}
