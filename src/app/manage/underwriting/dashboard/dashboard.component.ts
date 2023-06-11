import { Component, OnInit } from '@angular/core';
import { ServerTokenService } from '../../../services/server-token.service';
import { UnderwritingDataService } from '../underwriting-data.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  regularHtml: boolean = false
  externalReport: boolean = false
  internalReport: boolean = false
  newImpairment: boolean = false
  editUnder: boolean = false
  messages: boolean = false
  notification: boolean = false
  addCase: boolean = false
  underDash: boolean = false
  data: any = null

  constructor(private service: ServerTokenService, public serviceData: UnderwritingDataService) { }

  ngOnInit() {
    console.log('in dashboard');
    
    this.serviceData.getNtf()
    this.selectPage()
  }

  selectPage() {
    let user = JSON.parse(localStorage.getItem('currentUser')) 
    if (user['role'] > 500 && user['role'] < 600) {
      this.underDashPage()
    } else if (user['role'] > 600 && user['role'] < 700) {
      this.policyDashPage()
    }
  }

  addImpPage() {
    this.regularHtml = false
    this.externalReport = false
    this.internalReport = false
    this.editUnder = false
    this.messages = false
    this.addCase = false
    this.underDash = false
    this.newImpairment = true
  }

  newUnder() {
    if (window.confirm('Please note, creating a new underwriting will delete the data that has not yet been saved')) {
      this.serviceData.data = null
      this.regularHtml = false
      setTimeout(() => {
        this.regularHtmlPage()
      }, 1);
    }
  }

  exportPdfPage() {
    this.regularHtml = false
    this.internalReport = false
    this.newImpairment = false
    this.editUnder = false
    this.messages = false
    this.notification = false
    this.addCase = false
    this.underDash = false
    this.externalReport = true
  }

  policyDashPage() {
    this.regularHtml = false
    this.internalReport = false
    this.newImpairment = false
    this.externalReport = false
    this.messages = false
    this.notification = false
    this.addCase = false
    this.underDash = false
    this.editUnder = true
  }

  regularHtmlPage() {
    this.internalReport = false
    this.newImpairment = false
    this.externalReport = false
    this.editUnder = false
    this.messages = false
    this.notification = false
    this.addCase = false
    this.underDash = false
    this.regularHtml = true

  }

  internalReportPage() {
    this.newImpairment = false
    this.externalReport = false
    this.editUnder = false
    this.regularHtml = false
    this.messages = false
    this.notification = false
    this.addCase = false
    this.underDash = false
    this.internalReport = true
  }

  messagesPage() {
    this.newImpairment = false
    this.externalReport = false
    this.editUnder = false
    this.regularHtml = false
    this.internalReport = false
    this.notification = false
    this.addCase = false
    this.underDash = false
    this.messages = true
  }

  notificationPage() {
    this.newImpairment = false
    this.externalReport = false
    this.editUnder = false
    this.regularHtml = false
    this.internalReport = false
    this.messages = false
    this.addCase = false
    this.underDash = false
    this.notification = true
  }

  addCasePage() {
    this.newImpairment = false
    this.externalReport = false
    this.editUnder = false
    this.regularHtml = false
    this.internalReport = false
    this.messages = false
    this.notification = false
    this.underDash = false
    this.addCase = true

  }

  underDashPage() {
    this.newImpairment = false
    this.externalReport = false
    this.editUnder = false
    this.regularHtml = false
    this.internalReport = false
    this.messages = false
    this.notification = false
    this.addCase = false
    this.underDash = true
  }




  exportInternal(data: boolean) {
    if (data) { this.internalReportPage() }
  }

  tranfer(action: string) {
    switch (action) {
      case 'edit':
        this.regularHtmlPage()
        break;
      case 'internal':
        this.internalReportPage()
        break;
      case 'external':
        this.exportPdfPage()
        break;
      case 'underwriting':
        this.regularHtmlPage()
        break
      case 'editCase':
        this.addCasePage()
        break
      case 'messages':
        this.messagesPage()
        break
      case 'dashboard':
        this.policyDashPage()
      default:
        break;
    }
  }
}
