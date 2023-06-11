import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environment/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { ServerTokenService } from '../../../services/server-token.service';


@Component({
  selector: 'ngx-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss']
})
export class KycComponent implements OnInit {

  kycSrc;
   // environment.apiUrl + '/kyc.html';
  constructor(private sanitizer: DomSanitizer, private server: ServerTokenService) {
    // this.kycSrc = this.sanitizer.bypassSecurityTrustResourceUrl(environment.apiUrl + "/kyc.html");
    this.server.getWithToken('getKycUrl').subscribe( data => {
      this.kycSrc = this.sanitizer.bypassSecurityTrustResourceUrl(data['url']);
    })
   }
  

  ngOnInit() {
    
  }

  getUrl() {
    return this.sanitizer.bypassSecurityTrustUrl("http://ynet.co.il");

  }

}
