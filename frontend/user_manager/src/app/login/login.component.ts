import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';  
  password: string = '';  

  constructor(private authService: AuthService, private router: Router) {}

  
  login(): void {
    if (!this.username || !this.password) {
      return;
    }

    
    this.authService.login(this.username, this.password).subscribe({
      next: (user) => {

        console.log("Login successful, user: ", user);
        
        this.router.navigate(['/home']);
      },
      error: (error) => {

        console.error("Login error: ", error);
        
        alert('Login failed, please check your credentials.');
      }
    });
  }

}
