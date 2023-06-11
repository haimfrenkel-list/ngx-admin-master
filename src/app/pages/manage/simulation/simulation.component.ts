import { Component, OnInit } from '@angular/core';
import {SimulationStringsService} from './simulation-strings.service'

@Component({
  selector: 'ngx-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {
  strings:any;
  constructor(private stringService: SimulationStringsService) { }

  ngOnInit() {
    this.strings = this.stringService.getStrings();
  }

}
