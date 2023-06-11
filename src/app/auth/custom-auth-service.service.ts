import { Injectable } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Observable, throwError } from 'rxjs';
import { User, UserToken, PersonalInfo } from '../models/user';
import { UserService } from '../services/user.service';
import { Route, Router } from '@angular/router';
import { ServerTokenService } from '../services/server-token.service';  
import { environment } from '../environment/environment';
@Injectable({
  providedIn: 'root',
})
// tslint:disable:no-console
export class CustomAuthServiceService {
  updateUser(user: UserToken) {
    this.currentUserSubject = user;
  }

  updateInvestorInfo(user: User): Observable<User> {
    return new Observable<User>(subscribe => {
      this.userServices.updateInvestorInfo(user).subscribe(data => {
        this.currentUserSubject.user = data;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUserSubject));
        subscribe.next(data);
      });
    });

  }

  saveLoginUser(user: UserToken | any) {
    this.expirationTime = new Date(user.expirationTime);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('expirationTime', this.expirationTime.toISOString());
    const v: HTMLIFrameElement = document.getElementById('loginIframe') as HTMLIFrameElement;
    v.contentWindow.
      postMessage({ firstName: user.user.firstName, lastName: user.user.lastName, token: user.token, userObj: user }, '*');

    if (user.user && user.role > 30) {
      this.currentUserSubject = user
    }
  }

  getSavedLoginUser() {

  }


  constructor(private service: ServerService,
    private router: Router,
    private userServices: UserService,
    private tokenServerService: ServerTokenService) {
    const tokenTime = localStorage.getItem('expirationTime');

    if (tokenTime) {
      const ex = new Date(tokenTime);
      if (ex.getTime() - Date.now() > 0 && localStorage.getItem('currentUser')) {
        try {

          this.currentUserSubject = JSON.parse(localStorage.getItem('currentUser'));
          tokenServerService.setAuthToken(this.currentUserSubject.token);
          userServices.initUserToken(localStorage.getItem('currentUser'));
        } catch (e) {

        }


      }
    }
  }

  private 
  currentUserSubject: UserToken;
  expirationTime: Date;
  currentUserValue(): UserToken {
    try {
      const cloned: UserToken = JSON.parse(JSON.stringify(this.currentUserSubject));
      // if (!cloned.user.personalInfo) { // TODO: check why is not created automaticly
      //   cloned.user.personalInfo = new PersonalInfo();
      // }
      return cloned;

    } catch (err) {
      return null;
    }
  }


  login(userName, password): Observable<UserToken> {
    // const obs = new Observable<UserToken>(observer => {

    const obs = this.service.post<UserToken>('auth/login', { userName, password });
    obs.subscribe(data => {
      this.tokenServerService.setAuthToken(data.token);
      this.currentUserSubject = data;
      console.log(this.currentUserSubject)
      this.saveLoginUser(data);
      this.goToAfterLogin(data)
      // ( this.expirationTime.getDate() - Date.now()));
      // observer.next(data);
    }
      ,
      err => {
        console.log('err auth service', err);
        // observer.error(err);
      },
    );
    // });
    // obs.pipe(
    //   catchError(function(err, ff){
    //     return throwError('fasf');
    //   })
    // );
    return obs;

  }

  updatePassword(username, password, token?) {


    const obs = new Observable<UserToken>(observer => {
      if (token) {
        // tslint:disable-next-line:max-line-length
        this.service.post<UserToken>('manage/login/updatePassword', { username, newPassword: password, token: token, isAccredited: true }).subscribe(data => {
          this.currentUserSubject = data;
          this.saveLoginUser(data);
          this.tokenServerService.setAuthToken(data.token);
          observer.next(data);

        });
      } else {
        this.tokenServerService.postWithToken<UserToken>('manage/login/updatePassword',
          { username, newPassword: password, isAccredited: true }).subscribe(data => {
            this.currentUserSubject = data;
            this.saveLoginUser(data);
            this.tokenServerService.setAuthToken(data.token);
            observer.next(data);
          });

      }
    });
    return obs;
  }
  resetPassword(email) {
    // username, password, newPassword
    return this.service.post<UserToken>('manage/login/resetPassword',
      { email });
  }

  goToAfterLogin(data) {
    console.log('go to the after');
    
    let role = Number(data.role)
    if ((data.role > 700 && data.role < 1000) || data.role == 100) {
      this.router.navigateByUrl('manage/upload');
    } else if (data.role > 500 && data.role <= 700) {
      // this.router.navigateByUrl('manage/underwriting');
    } else if (data.role > 30 && data.role <= 32) {
      this.router.navigateByUrl('manage/upload')
    }
    return;
    setTimeout(() => {
      if (data.changePassword) {
        this.router.navigateByUrl('/auth/update-password');
      } else if (data.user.role === 'superAdmin') {
        this.router.navigateByUrl('manage/assets');
      } else if (data.user.role === 'financeAdmin') {
        this.router.navigateByUrl('calculations');
      } else if (data.user.role === 'admin') {
        this.router.navigateByUrl('manage/contacts');
      } else if (data.user.role === 'investor') {
        this.router.navigateByUrl('manage/assets');
      } else {
        this.router.navigateByUrl('manage/upload');
      }
    }, 1);
  }

  goToLogin() {
    this.currentUserSubject = null
    localStorage.clear()
    this.router.navigate(['/auth/login']);
  }

}
