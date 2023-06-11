import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PolycyHolder } from '../../../models/user';
import {PolicyHolderStringsService} from './policy-holder-strings.service';

@Component({
  selector: 'ngx-policy-holder',
  templateUrl: './policy-holder.component.html',
  styleUrls: ['./policy-holder.component.scss'],
})
// tslint:disable:no-console
export class PolicyHolderComponent implements OnInit {
  strings: any;
  policyHolder: PolycyHolder;
  file: any;
  constructor(public router: Router, route: ActivatedRoute, private stringService: PolicyHolderStringsService) {
    if (! this.router.getCurrentNavigation().extras || ! this.router.getCurrentNavigation().extras.state) {
      router.navigate(['../holders'], {relativeTo: route });
      return;
    }
    this.policyHolder = this.router.getCurrentNavigation().extras.state.data;
  }

  ngOnInit() {
    this.strings = this.stringService.getStrings();
  }

  handleFileInput (files) {
    this.file = files[0];
  }

  upload() {
    // userId, file, type
  }
}
