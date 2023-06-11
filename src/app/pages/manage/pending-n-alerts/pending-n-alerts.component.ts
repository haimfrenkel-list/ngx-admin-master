import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {PendingNAlertsStringsService} from './pending-n-alerts-strings.service';
import { NbWindowState, NbWindowService } from '../../../../../node_modules/@nebular/theme';
import { ServerTokenService } from '../../../services/server-token.service';
import { UploadFileComponent } from '../upload-file/upload-file.component';

@Component({
  selector: 'ngx-pending-n-alerts',
  templateUrl: './pending-n-alerts.component.html',
  styleUrls: ['./pending-n-alerts.component.scss'],
})
export class PendingNAlertsComponent implements OnInit {
  strings: any;
  @ViewChild('accreditedPopup', { static: true, read: TemplateRef }) contentTemplate: TemplateRef<any>;
  // @ViewChild('loading', { static: true, read: TemplateRef }) loadin: ;
  windowRef: any;
  fileToUpload: FileList;
  displayUploadContainer = true;
  uploadAnimation  = false;


  constructor(private stringService: PendingNAlertsStringsService,
     private windowService: NbWindowService,
     private server: ServerTokenService,
     ) {
  }

  cards: Array<any>;

  ngOnInit() {
    this.strings = this.stringService.getStrings();
    this.checkCardStatusOnServer();
  }

  // use to check the cards status and update
  // the header and cards on the page live
  checkCardStatusOnServer() {

    this.server.getWithToken('users/getFinanceInfo').subscribe(data => {
      let hasPendingNotifications = false;
      this.cards = this.getCards();
      if (data['accreditedFile']) {
        const v = data['accreditedFile'];
        if (v.status == null) {
           hasPendingNotifications = true;
        } else if (v.status === 'pending') {
          // tslint:disable:no-console
          console.log('make complete');
          this.cards[1].complete = true;
        } else if (v.status === 'complete') {

        }
      }
    });
  }

  getCards(): Array<any> {
    return [
      {
        title: this.strings.kycCardTitle,
        complete: false,
        imgUrl: 'assets/images/198Z_kyc@2x.png',
        content: this.strings.kycCardContent,
        buttonString: this.strings.updateNowButton,
        link: '../kyc',
      },
      {
        title: this.strings.accreditedCardTitle,
        complete: false,
        imgUrl: 'assets/images/accredited.png',
        content: this.strings.accreditedCardContent,
        buttonString: this.strings.startButton,
        click: 'alert();',
      },
      // {
      //   title: this.strings.personalInfoCardTitle,
      //   complete: true,
      //   imgUrl:'assets/images/personalInfo.png',
      //   content:this.strings.personalInfoCardContent,
      //   buttonString:this.strings.updateNowButton,
      //   link: '../kyc'
      // },
      // {
      //   title: this.strings.financialInfoCardTitle,
      //   complete: false,
      //   imgUrl:"assets/images/Depositphotos.png",
      //   content:this.strings.financialInfoCardContent,
      //   buttonString:this.strings.updateNowButton,
      //   link: '../kyc',

      // }
    ];
  }
  openWindow(item) {
    if (item['title'] !==  this.strings.accreditedCardTitle) {
      return;
    }
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
        },
      },
    );


  }

  closeWindow() {
    this.windowRef.close();
    this.checkCardStatusOnServer();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files;
      const file = this.fileToUpload[0];
      const data = {
        filename: file.name,
        content_type: file.type,
        filepath: 'ggg',
      };


      this.uploadAnimation = true;
      this.server.postFileToAws('getUrl', data, file, file.name).subscribe(res => {
        // tslint:disable-next-line:no-shadowed-variable
        this.server.postWithToken('users/updateAccredited', {fileUrl: res.baseUrl + '/' + res.fileName, status: 'pending' }).subscribe(data  => {
          this.displayUploadContainer = false;
          this.uploadAnimation = false;
        });
      }, err =>  {
        this.uploadAnimation = false;
      });

  }


}
