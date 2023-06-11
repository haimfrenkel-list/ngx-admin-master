import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'ngx-embed-id',
  templateUrl: './embed-id.component.html',
  styleUrls: ['./embed-id.component.scss']
})
export class EmbedIdComponent implements OnInit {

  embedIdSrc;
  constructor(private sanitizer: DomSanitizer) {
    this.embedIdSrc = this.sanitizer.bypassSecurityTrustResourceUrl(environment.apiUrl + "/embedId.html");

   }

  ngOnInit() {
  }

}
