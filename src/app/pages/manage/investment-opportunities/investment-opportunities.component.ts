
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowService, NbWindowRef } from '@nebular/theme';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { ShowFormComponent } from './show-form.component';
import { WindowFormComponent } from '../../modal-overlays/window/window-form/window-form.component';
import { Route, Router } from '@angular/router';
import { ServerTokenService } from '../../../services/server-token.service';
import { PagesStringResourceService } from '../pages-string-resource.service';
import { InvestmentOpportunitiesStringsService } from './investment-opportunities-strings.service'

export interface Card {
  headerImageUrl: string;
  lineOne: string;
  policyNumber: string;
  date: string;
  _id: string;
  minInvestment: Number;
  faceValue: Number;
}

@Component({
  selector: 'ngx-investmentOpportunities',
  templateUrl: './investment-opportunities.component.html',
  styleUrls: ['./investment-opportunities.component.scss']
})




export class InvestmentOpportunitiesComponent {
  strings: any;
  cardsBackgroundUrl = [
    'https://list-upload-files-test.s3.us-east-2.amazonaws.com/test1/public/Investors/headerImage+1.jpg',
    'https://list-upload-files-test.s3.us-east-2.amazonaws.com/test1/public/Investors/headerImage+2.jpg',
    'https://list-upload-files-test.s3.us-east-2.amazonaws.com/test1/public/Investors/headerImage+3.jpg',
    'https://list-upload-files-test.s3.us-east-2.amazonaws.com/test1/public/Investors/headerImage+4.jpg',
    'https://list-upload-files-test.s3.us-east-2.amazonaws.com/test1/public/Investors/headerImage+5.jpg',
    'https://list-upload-files-test.s3.us-east-2.amazonaws.com/test1/public/Investors/headerImage+6.jpg',
    'https://list-upload-files-test.s3.us-east-2.amazonaws.com/test1/public/Investors/headerImage+7.jpg',
  ]

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  //@ViewChild('contentTemplate',{static:true}) 

  constructor(private windowService: NbWindowService,
    private router: Router, private server: ServerTokenService, private stringsService: InvestmentOpportunitiesStringsService
              /*protected windowRef: NbWindowRef*/) {
  }
  cards: [Card];

  getAllPolicies() {
    this.server.getWithToken<[any]>('manage/policies/get').subscribe(dataF => {
      dataF.sort(function (first, second) {
        if (first.policyNumber > second.policyNumber)
          return -1;
        if (second.policyNumber < first.policyNumber)
          return 1;
        return 0;
      });
      this.cards = dataF;
    })
  }
  openWindow(selectedCard: Card) {
    // history.pushState({ data: { selectedCard } }, '', '');
    this.router.navigateByUrl('/pages/manage/policy-document?cardId=' + selectedCard.policyNumber, { state: { selectedCard }, queryParams: { cardId: selectedCard.policyNumber } });

    /* this.windowService.open(this.contentTemplate,  
       { title: '', 
       context: { text: 'https://drive.google.com/viewerng/viewer?embedded=true&url=https://list-upload-files-test.s3.us-east-2.amazonaws.com/18938d565a8c849dbb04ed389b203da9.pdf' } });*/

  }
  /*minimize() {
    this.windowRef.minimize();
  }
  
  close() {
    this.windowRef.close();
  }*/
  ngOnInit() {
    this.strings = this.stringsService.getString();
    this.getAllPolicies();
  }

}
