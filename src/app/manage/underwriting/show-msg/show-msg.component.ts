import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UnderwritingDataService } from '../underwriting-data.service';

@Component({
  selector: 'ngx-show-msg',
  templateUrl: './show-msg.component.html',
  styleUrls: ['./show-msg.component.scss']
})
export class ShowMsgComponent implements OnInit {
 
  constructor(public serviceData: UnderwritingDataService) { }
  @Input() messages: any
  editMessages = []

  ngOnInit() {
  
  }

  ngOnChanges(changes: SimpleChanges){
    this.editMessages = []
    this.messages.forEach(element => {
      this.editMessages.push({message: element, replay: false, textForReplay: null})
    });    
    console.log(this.editMessages);
    
  }

  replay(i: number) {
    this.editMessages[i].replay = true
  }

  send(msg: any, i: number) {
    let message = {
      authorName: JSON.parse(localStorage.getItem('currentUser'))['fullName'],
      caseID: msg.caseID,
      date: new Date(),
      body: this.editMessages[i].textForReplay,
      parentId: msg.id,
      ReplayTo: msg.authorName,
    }    
    this.serviceData.createMsg(message).subscribe(() => {
      // let ntf = {
      //   User: message.To,
      //   Case: message.Case,
      //   Date: new Date().toLocaleString(),
      //   Text: `${message.From} replayed you an answer in ${message.Case} case`,
      //   Type: null,
      //   Accepted: false
      // }
      // this.serviceData.createNote(ntf)
      this.serviceData.getMsg(msg.caseID).subscribe(()=>{
        this.serviceData.subject$.next()

      })

      this.editMessages[i].textForReplay = null
      this.editMessages[i].replay = null
    })
  }

  delete(message: any){
    this.serviceData.deleteMsg(message)
  }
}
