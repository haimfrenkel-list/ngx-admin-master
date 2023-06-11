import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ServerTokenService } from '../../../services/server-token.service';
import { UnderwritingDataService } from '../underwriting-data.service';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  @Output() action = new EventEmitter<string>();

  ntf
  constructor(private service: ServerTokenService, public serviceData: UnderwritingDataService, public windowRef: NbWindowRef) { }

  ngOnInit() {
    this.setBackButton()
    this.ntf = this.serviceData.notification
  }

  // navigateToCase(caseCode: string) {
  //   this.serviceData.getCaseData(caseCode).subscribe(data => {
  //     this.action.emit('edit')
  //   })
  // }

  setBackButton() {
    history.pushState(null, '', location.href);
    window.onpopstate = function () {
      history.go(1);
    };
    fromEvent(window, 'popstate').subscribe(() => {
      this.action.emit('underwriting')
    })
  }
}
