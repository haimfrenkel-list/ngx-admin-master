import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ServerTokenService } from '../../../services/server-token.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-holders',
  templateUrl: './holders.component.html',
  styleUrls: ['./holders.component.scss'],
})
export class HoldersComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();

  settings = {
    actions: false,
    pager: {
      display: true,
      perPage: 55,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // _id: "5e722156edbdca0d19b40ed5"
    // email: "y.modiiin@gmail.com"
    // firstName: "Izik"
    // lastName: "Oldme"
    // ID: "12345678"
    // time: "2020-03-18T13:25:42.962Z"
    columns: {
      name: {
        title: 'Full Name',
        type: 'string',
        valuePrepareFunction: (value, parent) => {
          return parent.firstName + ' ' + parent.lastName;
        },
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      numOfPolicies: {
        title: 'Num Of Policies',
        type: Number,
      },
      time: {
        title: 'Time',
        type: 'Date',
      },
    },
  };


  constructor(private service: ServerTokenService, private router: Router, private route: ActivatedRoute) {
    this.service.getWithToken<[]>('admin/super/getHolders').subscribe(data => {
      this.source.load(data);
    });
  }
  onUserRowSelect(event): void {
    const data = event.data;
    this.router.navigate(['../policy-holder'], { relativeTo: this.route, state: { data }});
  }


  ngOnInit() {

  }

}
