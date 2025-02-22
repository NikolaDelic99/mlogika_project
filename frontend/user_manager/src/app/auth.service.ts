import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user/user';
import moment from 'moment';
import { BehaviorSubject, map, Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jwtDecode } from "jwt-decode"; 
import { Router } from '@angular/router';

const AUTHENTICATION_SCHEME = "Bearer";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject!: BehaviorSubject<User>;
  public user!: Observable<User>;

  loginUrl = environment.protocol + "//" + environment.host + "/" + environment.root + "/auth/login";


  constructor(private router: Router, private httpClient: HttpClient) {
    let userJson = JSON.parse(localStorage.getItem("user")!);

    this.userSubject = new BehaviorSubject<User>(this.decodeUser(userJson));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.httpClient.post<any>(this.loginUrl, { username, password }).pipe(
      map(user => {
        
        localStorage.setItem("user", JSON.stringify( user ));
        this.userSubject.next(this.decodeUser(user));
        return user;
      }),
      shareReplay()
    );
  }

  decodeUser(userStorageJson: any): User {
    let decoded!: User;
    if (userStorageJson) {
      try {
        let token = userStorageJson.user.substring(AUTHENTICATION_SCHEME.length).trim();
        decoded = jwtDecode(token); 
        decoded.bearerToken = userStorageJson.user;
        console.log("Decoded user: ", decoded);
      } catch (e) {
        console.error("Error decoding token:", e);
      }
    }
    return decoded;
  }

  logout() {
    localStorage.removeItem("user");
    this.userSubject.next(null!);
    this.router.navigate(["/login"]);
  }

  getExpiration() {
    return moment.unix(+this.userValue.exp);
  }

  public isLoggedIn() {
    if (this.userValue) {
      return moment().isBefore(this.getExpiration());
    } else {
      return false;
    }
  }
}

