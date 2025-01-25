import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { LangSwitcherComponent } from './lang-switcher/lang-switcher.component';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './auth.service';
import { User } from './user/user';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [SharedModule,LangSwitcherComponent]
})
export class AppComponent {
  title = 'user_manager';
  modules = environment.modules;
  user!: User;
  private subscription: Subscription[] = [];  


  constructor(private authService: AuthService){}

  ngOnInit(): void {

    this.subscription.push(this.authService.user.subscribe(x => {
      this.user = x;
    }));
  }

  ngOnDestroy(): void {

    this.subscription.forEach(sub => sub.unsubscribe());
    
  }

  
  logout(): void {
    this.authService.logout();  
  }

  checkLogin(): boolean {
    return this.authService.isLoggedIn();  
  }
  



}
