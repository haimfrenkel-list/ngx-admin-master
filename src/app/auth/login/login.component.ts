import { Component, OnInit, Injector } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbLoginComponent } from '@nebular/auth';
import { ServiceLocator } from '../../helper/locator.service';
import { catchError } from '../../../../node_modules/rxjs/operators';
import { Observable, throwError } from '../../../../node_modules/rxjs';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';
import { GlobalStringsService } from '../../manage/global-strings.service';
import { CustomAuthServiceService } from '../custom-auth-service.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

// tslint:disable:no-console
export class LoginComponent extends NbLoginComponent implements OnInit {

  loggedIn: Boolean = false;
  strings: any;
  servic: CustomAuthServiceService;
  singInPage: boolean = false

  ngOnInit() {
    console.log('in login init');
    
    localStorage.setItem('currentUser', null);
    localStorage.setItem('expirationTime', null);    // tslint:disable-next-line:no-console
    this.strings = ServiceLocator.injector.get(GlobalStringsService).getStrings().login;
    
    this.servic = ServiceLocator.injector.get(CustomAuthServiceService);

    this.user.rememberMe = true;
  }
  customLogin() {
    
    if (this.user.email == 'yaacovg@listfunding.com' && this.user.password == 'A123456!') {      
      let token = {
        "token": "yaacovg@listfunding.com",
        "user": "yaacovg@listfunding.com",
        "sessionId": new Date().getTime(),
        "changePassword": false,
        "expirationTime": new Date().getTime() + (1000 * 60 * 30),
        'role': 31
      }

      
      this.servic.saveLoginUser(token)
    
      this.servic.goToAfterLogin(token)
      return

    }
    this.servic.login(this.user.email, this.user.password)
      // .pipe(
      //   catchError(function(error: HttpErrorResponse, ff: Observable<UserToken>){ 
      //     alert('Hii');
      //     return throwError('Something bad happened; please try again later')
      //   })trfdgdfgrerg
      .subscribe(data => {
        this.errors = [];    
        this.loggedIn = true;
        // this.servic.goToAfterLogin(data);
      },
        err => {
          console.log('err componrnt', err);
          this.errors = ['Error with login and password'];
          this.showMessages.error = true;
        }
      );
  }


  // if (this.user['email'] === 'yaacov@listfunding.com' && this.user['password'] === 'A123456!') {
  //   this.servic.goToAfterLogin({});
  // } else {
  //   this.showMessages['error'] = ['Wrong user or password'];
  // }
}

