import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { AddContactService } from '../services/add-contact.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {

  registerForm:FormGroup;

  constructor(private fb:FormBuilder,private addContactService:AddContactService,private router:Router,private route:ActivatedRoute) {
    this.registerForm = this.fb.group({
      account_id: [{value : "", readonly:true},Validators.required],
      type: ['', Validators.required],
      contact: ['', [Validators.required]],
      primary_contact: ['', [Validators.required]]
    });
  }

  onSubmit(f:NgForm){
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
