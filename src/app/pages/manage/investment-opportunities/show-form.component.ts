
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-show-form',

  styleUrls: ['show-form.component.scss'],
  templateUrl: './show-form.component.html',

})
export class ShowFormComponent {
  router: any;
  constructor(public windowRef: NbWindowRef) {}


  openWindow() {
    /* this.windowService.open(this.contentTemplate,  
        { title: '', 
        context: { text: 'https://drive.google.com/viewerng/viewer?embedded=true&url=https://list-upload-files-test.s3.us-east-2.amazonaws.com/18938d565a8c849dbb04ed389b203da9.pdf' } });
        */      
      }

  close() {
    this.windowRef.close();
  }
  ngOnInit() {
  }

}


