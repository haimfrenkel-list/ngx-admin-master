import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '../../../../../node_modules/@angular/router';
import { Subscription } from 'rxjs';
import { WorkerServiceService } from '../../../services/worker-service.service';
import { CustomAuthServiceService } from '../../../auth/custom-auth-service.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  tag = 'header-context-menu';
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user = {
    name: 'Haim Frenkel',   
    picture: '',
    firstLast: '',
  };

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' , pathMatch: ''} ];

  // variables for the notification service
  subscription: Subscription;
  pendingNotifications: boolean;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              // private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private route: Router,
              protected generalData: WorkerServiceService,
              private loginService: CustomAuthServiceService) {
    // menuService.onItemClick().pipe(filter(({ tag }) => tag === this.tag))
    // .subscribe(bag => {
    //   if (bag.item.title === 'Log out') {
    //     userService.logout();
    //   } else if (bag.item.title === 'Profile') {
    //     route.navigateByUrl('manage/account');
    //   }
    //       sidebarService.collapse();
    // });

    // menuService.onItemClick().subscribe(bag => {
    //   if (window['mobileCheck']()) {
    //     sidebarService.collapse();
    //   }
    // });
    // subscribing to notification changes
  }

  logoClicked() {
    window.location.href = 'https://listfunding.com';
  }

  setUserDetails() {
    this.user.picture = '';
    this.user.firstLast = this.user.name.split(' ')[0][0] + this.user.name.split(' ')[1][0];
    // alert(this.user.name.split(' ')[0])
  }

  ngOnInit() {  
   this.user.name = this.loginService.currentUserValue()['fullName'];
    this.currentTheme = this.themeService.currentTheme;

    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => this.user = users.nick);
    this.setUserDetails();

    this.menuService.onItemClick().subscribe(( event ) => {
      this.onItemSelection(event.item.title);
    })

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

      // get te user pending notification upon login

  }

  onItemSelection( title ) {    
    if ( title === 'Log out' ) {
      this.loginService.goToLogin()
    } else if ( title === 'Profile' ) {
      // Do something on Profile
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    if (! window['mobileCheck']()) {
      return;
    }
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToPendingNAlerts() {
    this.route.navigateByUrl('manage/pending-n-alerts');
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  firstLast() {
    return 'FS';
  }
}
