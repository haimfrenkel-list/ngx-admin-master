import { Component, OnInit } from '@angular/core';
import { ServerTokenService } from '../../services/server-token.service';
import { WorkerServiceService } from '../../services/worker-service.service';
import data from '../../../../data.json'
import { HttpClient } from '@angular/common/http';
import { log } from 'console';
import { calcCD } from 'shared';

@Component({
  selector: 'ngx-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.scss'],
})

export class OcrComponent implements OnInit {
  dataForTest = data
  jobId = '123456uuu'

  demoTabels = {
    files: null,
    tables: {
      Rx: null,
      Lifestyle: null,
      Labs: null,
      Test: null,
      Condition: null,
    },
    generalInfo: null,
    impiremants: null,
    medication: null,
    labs: null,
    lifestyle: null,
    le: null,
    CD: null,
  }

  constructor(protected workerService: WorkerServiceService, private server: ServerTokenService, private http: HttpClient) {
    this.files = workerService.files;
  }


  jobStatus = ''
  files: any[] = [
    { name: 'A', max: 80 * 1000, status: 'OCR', progress: 0 },
    { name: 'B', max: 60 * 1000, status: 'Extract medicin', progress: 0 },
    { name: 'C', max: 70 * 1000, status: 'Extract lalal', progress: 0 },
    { name: 'D', max: 30 * 1000, status: 'Extract lalal2', progress: 0 },
  ];

  ngOnInit() {
    // this.files.map(item => {
    //   const a = new Task();
    //   a.start(item.status, item, item.max);
    // });
    if (!this.workerService.isProccecing) {
      // this.getJobs()
    }

  }
  process() {
    // this.workerService.proccess();
    let fileArray = this.workerService.files.length > 0 ? this.workerService.files : null
    this.server.postWithToken('workflow/start', {
      runTime: 1000 * 35, dirName: this.workerService.dirName,
      files: this.files.map(item => item["listName"]), jobs: this.workerService.jobs, fileArray: fileArray ? fileArray : null
    }).subscribe(data => {
      console.log(data);
      this.jobId = data['jobId']
      this.checkStatus(this.jobId)
      this.workerService.isProccecing = true;
    })
  }

  getJobs() {
    this.server.getWithToken('workflow/getJobs').subscribe(data => {
      let jobs = Object.keys(data)
      if (!this.workerService.isProccecing && jobs.length > 0) {
        let status = data[jobs[jobs.length - 1]].job['status']
        if (status != 'Done') {
          this.checkStatus(jobs[jobs.length - 1])
          this.workerService.allData = this.demoTabels
          this.workerService.isProccecing = true;
        }
      }
    })
  }

  checkStatus(jobId) {
    this.jobId = jobId
    this.server.postWithToken<any>('workflow/getJobStatus', { jobId: jobId }).subscribe(data => {
      console.log(data);
      this.jobStatus = data.status

      if (data && data.files) {
        this.workerService.isFileUpkoadProccessDone = true;
        this.workerService.files = data.files;
        this.files = this.workerService.files
        // this.workerService.updateListFiles(this.files)
      }
      if (data && data.generalInfo) {
        this.workerService.genralInfoFill = Object.keys(data.generalInfo);
        this.workerService.allData['generalInfo'] = data.generalInfo;
      }
      if (data && data.stanzaFeatuers && data.stanzaFeatuers.length) {
        this.workerService.stanzaFeatuersKeys = Object.keys(data.stanzaFeatuers[0])
        data.stanzaFeatuers.map(item => {
          if (item.label == 'PROBLEM') {
            this.workerService.stanzaFeatuersProblems.push(item)
          }
          // } else if (item.label == 'TREATMENT') {
          //   this.workerService.stanzaFeatuersMeds.push(item)
          // } else if (item.label == 'TEST') {
          //   this.workerService.stanzaFeatuersLabs.push(item)
          // }
        })
      }

      if (data && data.stanzaFeatuersMeds && data.stanzaFeatuersMeds.length) {
        this.workerService.stanzaFeatuersMedsKeys = Object.keys(data.stanzaFeatuersMeds[0])
        data.stanzaFeatuersMeds.map(item => {
          // if (item.label == 'PROBLEM') {
          this.workerService.stanzaFeatuersMeds.push(item)
          // }
          // } else if (item.label == 'TREATMENT') {
          //   this.workerService.stanzaFeatuersMeds.push(item)
          // } else if (item.label == 'TEST') {
          //   this.workerService.stanzaFeatuersLabs.push(item)
          // }
        })
      }
      if (data && data.stanzaFeatuersLabs && data.stanzaFeatuersLabs.length) {
        this.workerService.stanzaFeatuersLabsKeys = Object.keys(data.stanzaFeatuersLabs[0])
        data.stanzaFeatuersLabs.map(item => {
                    // if (item.label == 'PROBLEM') {
              this.workerService.stanzaFeatuersLabs.push(item)
          // }
          // } else if (item.label == 'TREATMENT') {
          //   this.workerService.stanzaFeatuersMeds.push(item)
          // } else if (item.label == 'TEST') {
          //   this.workerService.stanzaFeatuersLabs.push(item)
          // }
        })
      }
      if (data && data.CD) {
        this.workerService.allData.CD = data.CD
      }
      if (data && data.listFeatuers && data.listFeatuers.length) {
        data.listFeatuers.map(item => {
          this.workerService.listFeatuers.push(item)
        })
      }

      // if (data && data.prediction) {
      //   this.workerService.isLeDone = true;
      //   this.workerService.prediction = data.prediction.prediction



      //   return
      // }
      if (data && data.status == 'Done') {
        let age = data.generalInfo['DOB'] ? Math.floor(Number(new Date(data.generalInfo['DOB']).getAge())) : null
        let lives = new calcCD(age, data.generalInfo.Gender, data.generalInfo.Smoke, (data.CD / 100) + 1 + 0.7).ConvertToPercentages()
        if (lives) {
          this.workerService.isLeDone = true;
        }
        this.editData(lives)
        return
      }
      setTimeout(this.checkStatus.bind(this), 2000, this.jobId);
    })
  }

  editData(data: any) {
    console.log(data);

    let y = 0
    console.log(data.chart);
    this.workerService.allData.le['lives'] = []
    this.workerService.allData.le['dies'] = []
    for (let i = 0; i < data.chart.length; i++) {
      this.workerService.allData.le['lives'].push(data.chart[i].lives)
      this.workerService.allData.le['dies'].push(data.chart[i].pre)
    }
    this.workerService.allData.generalInfo['Life Expectancy Mean'] = data.average
    this.workerService.allData.generalInfo['Life Expectancy Median'] = data.median

    console.log(this.workerService.allData.le['lives']);
    console.log(this.workerService.allData.le['dies']);

  }

  checkGeneralInfoDone(jobId) {
    // this.server.postWithToken<any>('workflow/getGeneralInfo', {jobId: jobId}).subscribe(data => {
    this.workerService.genralInfoFill = Object.keys(this.dataForTest);
    // this.workerService.allData.generalInfo = this.dataForTest;
    if (this.dataForTest && this.dataForTest.prediction) {
      this.workerService.isLeDone = true;
      this.workerService.prediction = this.dataForTest.prediction.prediction
      return
    }
    setTimeout(this.checkGeneralInfoDone.bind(this), 1000 * 3, this.jobId);
    // })
  }

  getGeneralInfo(jobId) {
    this.checkGeneralInfoDone(this.jobId);
  }
}
