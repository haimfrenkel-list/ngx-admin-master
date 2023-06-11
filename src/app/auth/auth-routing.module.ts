import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'; // <---
import { NbAuthComponent } from '@nebular/auth';
import { AuthComponentComponent } from './auth-component/auth-component.component';
// import { RegisterComponent } from '../manage/register/register.component';
import { AdminGuard, AuthGuard } from './auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponentComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent, // <---
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],   
  exports: [RouterModule],
})
export class AuthRoutingModule { }
