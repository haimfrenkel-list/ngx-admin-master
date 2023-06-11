import { Injectable } from '@angular/core';
import {  UserToken, User } from '../models/user.js';
import { AuthenticationService } from './authentication.service';
import {  Router } from '@angular/router';
import { Observable } from '../../../node_modules/rxjs';
import { ServerTokenService } from './server-token.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  getCurrentProtfolio(): String {
    return this.currentUser.user.defaultProtfolio;
  }
  updateInvestorInfo(user: User): Observable<User> {
    return new Observable<User>(observer => {
      this.serverTokenService.putWithToken<User>('manage/updateInfo',
        {
          _id: user._id,
          firstName: user.firstName, lastName: user.lastName,
          phoneNumber: user.phoneNumber, personalInfo: user.personalInfo
        }).subscribe(data => {
          observer.next(data);
        });
    });
  }


  private userDetails ={
    firstName:'',
    lastName:'',
  };
  private currentUser:UserToken;

  constructor(private serverTokenService: ServerTokenService,
    private authService: AuthenticationService, private router:Router) { }

  initUser(data: UserToken){
    this.userDetails.firstName = data.user.firstName.toString();
    this.userDetails.lastName = data.user.lastName.toString();
  };

  initUserToken(data: string){
    this.currentUser = JSON.parse(data);
  };

  getFullName(): string{
    let localUser =JSON.parse (localStorage.getItem('currentUser'));
    let full = '';
    if(localUser.user.firstName){
      full += localUser.user.firstName.trim();
    }
    if(localUser.user.lastName) {
      full += " " + localUser.user.lastName.trim();
    }
    return  full;
  }

  getUser(): User {
    let localUser =JSON.parse (localStorage.getItem('currentUser'));
    return localUser.user;
  }

  getPendingNotifications():boolean{
    let localUser =JSON.parse (localStorage.getItem('currentUser'));
    if( localUser.user.accreditedFile.status == null){
      return true;
    }
    return false;
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('auth/login');
  }
}
