import { Component, OnInit } from '@angular/core';
import {HoldingsInvestmentScheduleStringsService} from './holdings-investment-schedule-strings.service'

@Component({
  selector: 'ngx-holdings-investment-schedule',
  templateUrl: './holdings-investment-schedule.component.html',
  styleUrls: ['./holdings-investment-schedule.component.scss']
})
export class HoldingsInvestmentScheduleComponent implements OnInit {
  strings:any;
  constructor(private stringService: HoldingsInvestmentScheduleStringsService) { }

  cards = [];
  ngOnInit() {
    this.strings = this.stringService.getStrings();
  }

}
