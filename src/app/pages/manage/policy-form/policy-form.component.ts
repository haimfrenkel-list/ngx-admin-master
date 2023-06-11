import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'ngx-policy-form',
  templateUrl: './policy-form.component.html',
  styleUrls: ['./policy-form.component.scss']
})
export class PolicyFormComponent implements OnInit {

 
  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  //@ViewChild('contentTemplate',{static:true}) 

  constructor(private windowService: NbWindowService){}

  openWindow()
  {
  this.windowService.open(this.contentTemplate,  
    { title: '', 
    context: { text: 'https://drive.google.com/viewerng/viewer?embedded=true&url=https://list-upload-files-test.s3.us-east-2.amazonaws.com/18938d565a8c849dbb04ed389b203da9.pdf' } });
  }

  ngOnInit() {
  }

  

}
