import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddContactService } from '../services/add-contact.service';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
    selector: 'app-add-contact',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact.component.css'],
    standalone: true,
    imports: [SharedModule]
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
