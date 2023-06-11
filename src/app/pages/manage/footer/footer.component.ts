import { Component, OnInit } from '@angular/core';
import { GlobalStringsService } from '../../../manage/global-strings.service';

@Component({
  selector: 'ngx-footer-pages',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private stringsService: GlobalStringsService) { }

  strings: IGlobal;

  ngOnInit() {
    this.strings = this.stringsService.getStrings().global;

  }

}
