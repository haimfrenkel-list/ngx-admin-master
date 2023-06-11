import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
} from '@nebular/theme';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthComponentComponent } from './auth-component/auth-component.component';
// import { RegisterComponent } from '../manage/register/register.component';
// import { MatInputModule, MatTableModule } from '@angular/material';

@NgModule({
  declarations: [LoginComponent, AuthComponentComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAuthModule,
    ReactiveFormsModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatTableModule
  ],
})
export class AuthModule { }
