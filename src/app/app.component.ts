/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { environment } from './environment/environment';


@Component({
  selector: 'ngx-app',
  template: `<router-outlet></router-outlet>
  <div style="display: none;" id="divCheckServer">{{environment.apiUrl}}</div>
  <div style="display: none;" id="versionNumber">{{environment.apiUrl}}</div>
  <div style="display: none;" id="versionNumber2">{{environment.apiUrl}}</div>
  `,
})
export class AppComponent implements OnInit {

  public static isViewFirstPopup = false;
  constructor(private analytics: AnalyticsService, private seoService: SeoService) {
    this.environment = environment;
  }
  environment;
  loadScript() {
    const node = document.createElement('iframe'); // creates the script tag
    node.src = environment.apiUrl + '/login.html'; // sets the source (insert url in between quotes)
    node.style.display = 'none';
    node.id = 'loginIframe';
    // append to head of document
    document.body.appendChild(node);
  }

  ngOnInit(): void {    
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    this.loadScript();


  }
}
