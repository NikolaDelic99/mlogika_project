import { Component , AfterViewInit} from '@angular/core';
import { UpdateAccountService } from '../services/update-account.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GetAccountsService } from '../services/get-accounts.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements AfterViewInit{

  constructor(private route:ActivatedRoute, private getAccountsService:GetAccountsService){}

  onSubmit(f:NgForm){
    console.log(f.value);
  }

  ngAfterViewInit(): void {
    const accountId = this.route.snapshot.paramMap.get("id");
  }

}
