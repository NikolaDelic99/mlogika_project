import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders,HttpInterceptor, HttpRequest } from "@angular/common/http";
  
import { Injectable, Injector } from "@angular/core";
  
import { Observable, catchError, throwError } from "rxjs";
  
import { AuthService } from "./auth.service";
  
import { environment } from "src/environments/environment";  
import { LogService } from "./log.service";
  
  @Injectable()
  
  export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private authService: AuthService, private logService:
  LogService) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>> {
  
  
  
  const user = this.authService.userValue;
  
  const isApiUrl = request.url.startsWith("http://"+environment.host) ||
  
  request.url.startsWith("https://"+environment.host);
  
  if (this.authService.isLoggedIn() && isApiUrl) {
  
  const headers = new HttpHeaders({
  
  'Authorization': `${user.bearerToken}`,
  
  'WithCredentials': `true`,
  
  });
  
  let url = request.url;
  
  request = request.clone({headers,
  
  url : url,
  
  });
  
  
  return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
  
  this.logService.handleError(error).subscribe();
  
  return throwError(() => error);
  
  }));
  
  }
  
  return next.handle(request);
  
  }
  
  }


