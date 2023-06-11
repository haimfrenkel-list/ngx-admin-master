import {
    Route, Router,
    CanActivate, CanLoad, ActivatedRouteSnapshot, UrlSegment, RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';

class Permissions {
    // canActivate(user: UserToken, id: string): boolean {

    // }
}


@Injectable({
    providedIn: 'root',
})
export class AuthGuardService {

    constructor() { }
}


import { CustomAuthServiceService } from './custom-auth-service.service';
import { UserToken } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate, CanLoad {
    constructor(
        private router: Router,
        private authenticationService: CustomAuthServiceService,
    ) { }

    canLoad(route: Route, segments: UrlSegment[]) {
        let currentUser: UserToken;
        currentUser = this.authenticationService.currentUserValue();
        if (!currentUser || !currentUser.token || (Number(currentUser.role) > 10 &&
            Number(currentUser.role) < 100)
            //  && (currentUser.user.role === 'superAdmin'
            // || currentUser.user.role === 'admin'
            // || currentUser.user.role === 'investor' || currentUser.user.role === 'policyManager')
        ) {
            // authorised so return true
            alert('no alowd');
            this.router.navigate(['/manage/underwriting'], { queryParams: {} });
            return false;
        }

        // not logged in so redirect to login page with the return url

        return true;

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let currentUser: UserToken;
        currentUser = this.authenticationService.currentUserValue();
        let role = Number(currentUser.role)
        if (currentUser && currentUser.token &&
            role > 0 && role < 10) {
            // authorised so return true
            return true;
        }
        if (currentUser && currentUser.token &&
            role > 10) {
            alert('no alwod');
            this.router.navigate(['/manage/underwriting'], { queryParams: { returnUrl: state.url } });
            return false;
        }

        // not logged in so redirect to login page with the return url
        alert('you need to sing in');
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }


    canManageUnder(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let currentUser: UserToken;
        currentUser = this.authenticationService.currentUserValue();
        let role = Number(currentUser.role)
        if (currentUser && currentUser.token &&
            role === 3) {
            // authorised so return true
            return true;
        }
        if (currentUser && currentUser.token &&
            role > 10) {
            alert('no alwod');
            this.router.navigate(['/manage/underwriting'], { queryParams: { returnUrl: state.url } });
            return false;
        }

        // not logged in so redirect to login page with the return url
        alert('you need to sing in');
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private router: Router,
        private authenticationService: CustomAuthServiceService,
    ) { }

    canLoad(route: Route, segments: UrlSegment[]) {
        let currentUser: UserToken;
        currentUser = this.authenticationService.currentUserValue();
        if (!currentUser || !currentUser.token
            //  && (currentUser.user.role === 'superAdmin'
            // || currentUser.user.role === 'admin'
            // || currentUser.user.role === 'investor' || currentUser.user.role === 'policyManager')
        ) {
            // authorised so return true
            alert('load');
            this.router.navigate(['/auth/login'], { queryParams: {} });
            return false;
        }


        return true;

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        alert('canLoad');
        let currentUser: UserToken;
        currentUser = this.authenticationService.currentUserValue();
        if (currentUser &&
            currentUser.user.role === 'superAdmin') {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        alert('activate');
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
