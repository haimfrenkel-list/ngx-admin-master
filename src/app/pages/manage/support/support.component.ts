import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {QnA, qnaMock} from './qna'
import {UserService} from '../../../services/user.service'
import { User } from '../../../models/user.js';
import {SupportStringsService} from './support-strings.service'
import { ServerTokenService } from '../../../services/server-token.service';
import { NbWindowService, NbWindowState, NbWindowRef } from '../../../../../node_modules/@nebular/theme';

@Component({
  selector: 'ngx-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  allQnAs:{}[];
  shownAnswers:{};
  currentQuestion:number;
  subject: String;
  message: String;
  user:User;
  strings:any;
  @ViewChild('contentTemplate2', { static: true, read: TemplateRef }) contentTemplate: TemplateRef<any>;
  windowRef: NbWindowRef;
  reqMessage: String;
  


  constructor(private userServices:UserService,
    private stringService: SupportStringsService,
    private tokenServer: ServerTokenService,
    private windowService: NbWindowService) { }

  ngOnInit() {
    this.strings = this.stringService.getStrings();
    this.allQnAs = this.stringService.getQnA<QnA[]>();
    
  
    // this.getQnAs();
    this.user = this.userServices.getUser();
  }

  onSubmit() {
    if(! this.message || ! this.subject){
      this.reqMessage = "Subject and message is required";
      return;
    }
    this.reqMessage = "";
    const obj = {
      userId: this.user._id,
      email: this.user.email,
      userType: 'investor',
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      phoneNumber: this.user.phoneNumber,
      message: this.message,
      subject: this.subject
    };
      console.log(obj);
      this.tokenServer.postWithToken('users/addSupportTicket', obj).subscribe(data => {
        console.log(data);
        this.message = "";
        this.subject = "";
        this.windowRef = this.windowService.open(this.contentTemplate,
          {
            title: '',
            hasBackdrop: true,
            closeOnBackdropClick: true,
            // hasBackdrop: true,
            initialState: NbWindowState.FULL_SCREEN,
            closeOnEsc: true,
            context: {
              text: 'https://drive.google.com/viewerng/viewer?embedded=true&url=https://list-upload-files-test.s3.us-east-2.amazonaws.com/18938d565a8c849dbb04ed389b203da9.pdf',
            }
          }
        );
    
      }, err => {
        console.log(err);
      });
  }

  // getQnAs(){
  //   console.log('getQnAs' );
  //   console.log(data );
  //   this.allQnAs = data['default'];
  //   console.log('successfully loaded QnAs');
  // }

  toggleAnswer(qna: QnA){
    qna.show = !qna.show;
  }

  closeWindow() {
    this.windowRef.close();
  }

}
