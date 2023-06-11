import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  @ViewChild('chart_line', { static: false }) chart: ElementRef;

  @Input() data: { xArray: any[], series: { name: string, type: string, color: string, yArray: any[], lineStyle: { width: number } }[], title: string }

  xArray
  yArray
  series
  title
  constructor() { }

  ngOnInit() {
    this.xArray = this.data.xArray
    this.series = this.data.series
    this.title = this.data.title
    this.initChart()
  }

  initChart() {
    setTimeout(() => {
      echarts.init(this.chart.nativeElement, 'light', { renderer: 'svg' }).setOption(this.getOptionsForGraph());
    }, 300);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit()
  }

  getOptionsForGraph() {
    let max: number
    if (this.title == 'BMI') { max = 40 }
    return {
      title: {
        text: this.title,
        top: 0,
        left: 10,
        show: true,
        textStyle: {
          color: '#707070',
          fontSize: 20,

        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
      },
      legend: {
        left: 'center',
        top: 'bottom',
        data: ['Total Investment', 'Payout']
      },
      xAxis: {
        type: 'category',
        name: 'month',
        splitLine: { show: false },
        axisLabel: {
          fontSize: 12,
          formatter: '{value}',
        },
        data: this.xArray
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '10%',
        containLabel: true
      },
      yAxis: {
        minorSplitLine: {
          show: false
        },
        axisLabel: {
          fontSize: 12,
          formatter: '{value}',
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: [
              "rgba(250,250,250,0.05)",
              "rgba(200,200,200,0.02)",
            ]
          }
        },
      },
      series: this.series
    };
  }

}
