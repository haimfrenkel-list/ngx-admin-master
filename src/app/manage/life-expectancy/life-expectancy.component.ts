import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WorkerServiceService } from '../../services/worker-service.service';

@Component({
  selector: 'ngx-life-expectancy',
  templateUrl: './life-expectancy.component.html',
  styleUrls: ['./life-expectancy.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate('500ms', style({opacity: 1})),
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('500ms', style({opacity: 0})),
        ]),
      ],
    ),
  ],
})
export class LifeExpectancyComponent implements OnInit {

  @ViewChild('chart_line_lives', { static: false }) chartLives: ElementRef;
  @ViewChild('chart_line_lives2', { static: false }) chartLives2: ElementRef;

  livesArray;
  keys = [ 'Name', 'Gender', 'Age', 'DOB', 'Smoke','Medical Records Start Date', 'Medical Records End Date',
    'Adress', 'State', 'SSN', 'Hight', 'BMI', 'Smoker', 'Life Expectancy Mean', 'Life Expectancy Median', 'Main Contributing Factors'];

  constructor(protected dataService: WorkerServiceService) {
    this.livesArray = dataService.allData.le['lives'];
   }
  ngOnInit() {
    this.loop();
  }
  loop() {
    if (this.dataService.isLeDone) {
      this.initChart();
    } else {
      setTimeout(() => {this.loop(); }, 1 * 1000);
    }
  }
  initChart() {
    setTimeout(() => {
      echarts.init(this.chartLives.nativeElement, 'light', { renderer: 'svg' }).setOption(this.getOptionsForGraph('lives'));
      echarts.init(this.chartLives2.nativeElement, 'light', { renderer: 'svg' }).setOption(this.getOptionsForGraph2('lives'));
    }, 300);
  }
  getOptionsForGraph(type) {
    const xArray = this.livesArray.map((a, b) => b + 1);

    return {
      title: { text: 'Projected Survivorship' },
      xAxis: {
        type: 'category',
        data: xArray,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.livesArray,
          type: 'line',
        },
      ],
    };
}
  getOptionsForGraph2(type) {
    const xArray = this.dataService.allData.le['dies'].map((a, b) => b + 1);
    return {
      title: { text: 'Probability Curve' },
      xAxis: {
        type: 'category',
        data: xArray,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.dataService.allData.le['dies'],
          type: 'line',
        },
      ],
    };
}

}
