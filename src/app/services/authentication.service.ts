import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environment/environment';
import { User } from '../user.model';
import { ServerTokenService } from './server-token.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    
    constructor(private http: HttpClient, private tokenService: ServerTokenService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/login`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    register(data: any): Observable<any> {
        let body = {email: data.email, userName: data.userName, password: data.password, privateName: data.privateName, role: data.role, roleNumber: data.roleNumber}        
        return this.tokenService.postWithToken<any>(`admin/addUser`, body)
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('firstName');
        localStorage.removeItem('userObj');
        var v: HTMLIFrameElement = document.getElementById('loginIframe') as HTMLIFrameElement;
        v.contentWindow.postMessage({ type: 'logout' }, '*');

        this.currentUserSubject.next(null);
    }
}
