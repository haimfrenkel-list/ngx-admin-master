import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerTokenService } from '../../../services/server-token.service';

@Component({
  selector: 'ngx-create-holder',
  templateUrl: './create-holder.component.html',
  styleUrls: ['./create-holder.component.scss'],
})
export class CreateHolderComponent implements OnInit {

  email = '';
  firstName;
  lastName;
  displayName;
  ID;

  constructor(private server: ServerTokenService) { }

  ngOnInit() {
  }

  submit() {
    this.server.postWithToken('admin/super/createHolder',
     {email: this.email, firstName: this.firstName, lastName: this.lastName, ID: this.ID }).subscribe(data => {
     });
  }
}
