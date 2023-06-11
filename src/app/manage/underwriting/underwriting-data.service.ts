import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { subscribeOn, tap } from 'rxjs/operators';
import { ServerTokenService } from '../../services/server-token.service';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class UnderwritingDataService {

  subject$ = new Subject();

  messages = []
  data: any
  userNames: string[]
  statusMode: string[] = ['New', 'Assignment', 'Accepted', 'Complete', 'Review']
  csvVersion
  notification
  numOfNtf: number = 0
  user = JSON.parse(localStorage.getItem('currentUser'))
  caseData: any
  patientData: any
  LEdata: any
  newCaseExsistingPatient: boolean = false
  groupNames: string[]

  constructor(private service: ServerTokenService) { }

  saveUnderwriting(form: any): Observable<any> {
    return this.service.postWithToken('underwriting/upUnd', form)
  }

  getLastVersion() {
    let last
    return this.service.getWithToken('underwriting/getVer').pipe(tap(version => {
      this.csvVersion = version['vers'].version
    }))
  }

  // getMessages() {
  //   let user = this.user['fullName']
  //   this.service.getWithToken(`msg/getallbyUser/:${user}`).subscribe((msg: any[]) => {
  //     msg.sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime())
  //     this.messages = msg
  //     this.numOfMsg = msg.length
  //   })
  // }

  getCaseData(id: string, caseId: string) {
    return this.service.getWithToken(`underwriting/allCaseData/${id}`).pipe(tap(data => {
      console.log(data);
      this.patientData = data['patient']
      this.caseData = data['case']
      console.log(this.caseData);
      
      this.LEdata = data['les']
    }))
  }

  getUndData(id: string) {
    return this.service.getWithToken(`underwriting/allUndData/${id}`).pipe(tap(data => {
      this.data = data
    }))
  }

  getNtf() {
    let user = this.user['fullName']
    this.service.getWithToken(`ntf/getByUsr/${user}`).subscribe((ntf: any[]) => {

      ntf.sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime())
      this.notification = ntf
      this.numOfNtf = ntf.length
    })
  }

  createNote(message: any) {
    this.service.postWithToken('ntf/add', message).subscribe(data => {
      this.getNtf()
    })
  }

  getMsg(id: number) {
    return this.service.getWithToken(`msg/getAllbyCase/${id}`).pipe(tap((msg: any[]) => {
      console.log(msg);
      this.messages = msg
    }))
  }

  createMsg(body: any) {
    return this.service.postWithToken('msg/add', body).pipe(tap((msg: any[]) => {
    }))
  }

  deleteMsg(message: any) {
    let id = message.id
    this.service.deleteWithToken(`msg/${id}`).subscribe(data => {
      if (message.Replayed && message.Replayed.length > 0) {
        message.Replayed.forEach(element => {
          this.deleteMsg(element)
        });
      } else {
        this.getMsg(message.caseID).subscribe(data => {
          this.subject$.next()
        })
      }
    })
  }
}
