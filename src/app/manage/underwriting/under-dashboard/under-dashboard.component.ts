import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { fromEvent } from 'rxjs';
import { ServerTokenService } from '../../../services/server-token.service';
import { UnderwritingDataService } from '../underwriting-data.service';
import { log } from 'console';

@Component({
  selector: 'ngx-under-dashboard',
  templateUrl: './under-dashboard.component.html',
  styleUrls: ['./under-dashboard.component.scss']
})
export class UnderDashboardComponent implements OnInit {
  @Output() action = new EventEmitter<string>();

  statusMode
  csvVersion
  tabelData = []
  constructor(private service: ServerTokenService, private serviceData: UnderwritingDataService) { }

  ngOnInit() {
    this.tabelData = []
    this.statusMode = this.serviceData.statusMode
    if (this.serviceData.csvVersion || !this.csvVersion) {
      this.serviceData.getLastVersion()
      this.csvVersion = this.serviceData.csvVersion
    }

    this.getUnderwritings()
    this.setBackButton()
  }


  setBackButton() {
    history.pushState(null, '', location.href);
    window.onpopstate = function () {
      history.go(1);
    };
    fromEvent(window, 'popstate').subscribe(() => {
      this.action.emit('underwriting')
    })
  }

  getUnderwritings() {
    this.service.getWithToken('underwriting/getUnd').subscribe((und: any[]) => {
      console.log(und);

      this.splitForTabels(und)
    })
  }

  splitForTabels(data: any[]) {
    let New = []
    let Assignment = []
    let Accepted = []
    let Complete = []
    let Review = []
    let unstatus = []


    data.forEach(element => {
      switch (element['ProcessStatus']) {
        case 'New':
          New.push(element)
          break;
        case 'Assignment':
          Assignment.push(element)
          break;
        case 'Accepted':
          Accepted.push(element)
          break;
        case 'Complete':
          Complete.push(element)
          break;
        case 'Review':
          Review.push(element)
          break;
        default:
          unstatus.push(element)
          break
      }
    })
    if (New.length > 0) { this.tabelData.push({ title: 'New', source: new LocalDataSource(New) }) }
    if (Assignment.length > 0) { this.tabelData.push({ title: 'Assignment', source: new LocalDataSource(Assignment) }) }
    if (Accepted.length > 0) { this.tabelData.push({ title: 'Accepted', source: new LocalDataSource(Accepted) }) }
    if (Complete.length > 0) { this.tabelData.push({ title: 'Complete', source: new LocalDataSource(Complete) }) }
    if (Review.length > 0) { this.tabelData.push({ title: 'Review', source: new LocalDataSource(Review) }) }
    if (unstatus.length > 0) { this.tabelData.push({ title: 'unstatus', source: new LocalDataSource(unstatus) }) }
  }

  getData(event) {
    console.log(event);
    let id = event.data._id
    let caseId = event.data.CaseId
    this.serviceData.getUndData(id).subscribe(data => {
      console.log(data);
      
      this.action.emit('underwriting')
    })
  }

  deleteUnder(event: any) {
    let Case = event.data.Case
    if (window.confirm(`Are you sure you want to delete ${Case}`)) {
      this.service.deleteWithToken(`underwriting/delUnd/:${Case}`).subscribe(res => {
        if (res['data'].deletedCount === 0) {
          alert('something worng')
          return
        }
        this.ngOnInit()
      })
    }
  }


  settings = {
    mode: 'external',
    add: '',
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
      Case: {
        title: 'Case',
        type: 'stirng',
      },
      FirstName: {
        title: 'First Name',
        type: 'stirng',
      },
      LastName: {
        title: 'Last Name',
        type: 'string',
      },
     createdBy: {
        title: 'Created By',
        type: 'string',
      },
      lastUpdeteBy: {
        title: 'Last update by',
        type: 'string',
      },
      ProcessStatus: {
        title: 'status',
        type: 'string',
      },
      
    },
  };

  //i need a function that get a number and return the number minus 10
  


}
