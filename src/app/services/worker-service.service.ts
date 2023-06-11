import { Injectable } from '@angular/core';
import * as data2 from './data2';
import * as data from './mergedLevine';
import * as cubicSpline from 'cubic-spline';
import { SseClient } from 'angular-sse-client';


function getRandomSecconds(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getImages(max) {
  max = max / 1000;
  if (max < 15) {
    return getRandomSecconds(50, 70);
  } else if (max < 20) {
    return getRandomSecconds(60, 80);
  } else if (max <= 25) {
    return getRandomSecconds(75, 90);
  }
  return getRandomSecconds(90, 95);
}

function getLevel() {
  const num = getRandomSecconds(1, 50);
  if (num <= 12) {
    return 'Low';
  } else if (num <= 30) {
    return 'Medium';
  }
  return 'High';
}

@Injectable({
  providedIn: 'root',
})
export class WorkerServiceService {
  user = JSON.parse(localStorage.getItem('currentUser'))
  demo = this.user['role'] < 100 ? true : false
  isFileUpkoadProccess = false;
  isFileUpkoadProccessDone = false;
  isProccecing = false;
  isFillTable = false;
  jobs: string[] = []
  caseData: Data = new Data();
  generalInfoCoumns: string[];
  genralInfoFill: string[] = [];
  isOcrDone = false;
  isLeWorking = false;
  isLeDone = false;

  leWorkingSpeed;
  speedMulti = 1000;
  speedLe = 1;
  sseClient: any;

  testTable: { a: { arr: any[] } };
  dirIndex: string;
  pacientName: string;
  dirName: string;
  prediction: any;
  stanzaFeatuers: [] = [];
  listFeatuers: any[] = [];
  stanzaFeatuersProblems: any[] = [];
  stanzaFeatuersKeys: any[] = ['Impairment', 'Negation'];
  stanzaFeatuersLabsKeys: any[] = ['Impairment', 'Negation'];
  stanzaFeatuersMedsKeys: any[] = ['Impairment', 'Negation'];

  stanzaFeatuersMeds: any[] = [];
  stanzaFeatuersLabs: any[] = [];
  listFeatuersKeys: any[] = [];
  generalData = {
    impairment: null,
    editedCD: null
  }
  updateListKeys() {
    if (this.listFeatuers && this.listFeatuers.length) {
      let obj = this.listFeatuers[0];
      this.listFeatuersKeys = Object.keys(obj);
    }
  }

  update(a: any) {
    alert('update')
    this.isFileUpkoadProccess = a.isFileUpkoadProccess;
    this.isFileUpkoadProccessDone = a.isFileUpkoadProccessDone;
    this.isProccecing = a.isProccecing;
    this.isFillTable = a.isFillTable;
    this.isOcrDone = a.isOcrDone;
    this.isLeWorking = a.isLeWorking;
    this.isLeDone = a.isLeDone;
    this.tables = a.tables;
    this.files = a.files;

  }

  updateListFiles(files: any[]) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files[i]);
    }
    if (this.files.length === 5) {
      this.allData = data2.Data;
    } else {
      this.allData = data.Data;
    }
    Object.keys(this.allData.tables).map(key => {
      this.tables[key] = [];
    });

    const array = [];
    this.allData.le['dies'].map((item, index) => {
      array.push(index + 1);
    });
    const sp = new cubicSpline(array, this.allData.le['dies']);
    this.allData.le['dies'] = [];
    array.map((item) => {
      this.allData.le['dies'].push(sp.at(item + 0.2));
    });
  }

  statusBaseArray = [
    { name: 'OCR', minTime: 10 * this.speedMulti, maxTime: 20 * this.speedMulti },
    { name: 'General Info', minTime: 10 * this.speedMulti, maxTime: 30 * this.speedMulti },
    { name: 'Impairments', minTime: 10 * this.speedMulti, maxTime: 30 * this.speedMulti },
    { name: 'Medication', minTime: 10 * this.speedMulti, maxTime: 30 * this.speedMulti },
    { name: 'Labs', minTime: 10 * 1000, maxTime: 30 * this.speedMulti },
    { name: 'Lifestyle', minTime: 30 * this.speedMulti, maxTime: 40 * this.speedMulti },
  ];

  allData: Data;
  files: any[] = [];
  existingFiles:any[] = []
  tables: {} = {};
  // data: Data;
  // tslint:disable-next-line:no-console
  constructor(private _sseClient: SseClient) {
    // this._sseClient.get('http://localhost:3000/sse/1242').subscribe( (_data: any) => {
    //   // tslint:disable-next-line:no-console
    //   this.update(_data);
    // });
  }

  baseData = {
    tableNames: ['Rx', 'Lifestyle', 'Labs', 'Test', 'Impairments', 'Troubleshooting'],
    tables: {
      Medication: ['Impairment', 'Category', 'Impairment', 'Rx Name', 'Rx Type', 'Start Date', 'End Date', 'Rx Date', 'Page'],
      Lifestyle: ['Impairment Category', 'Impairment', 'Feature', 'Report Date', 'Event Date', 'Clinician Name', 'Clinician Specialty', 'Value', 'Expanded Value', 'Page'],
      Labs: ['Impairment Category', 'Impairment', 'Feature Date', 'Feature', 'Value', 'Normal Range', 'Unit Of Measurement', 'Clinician Name', 'Clinician Specialty', 'Result Evaluation', 'Page'],
      Test: ['Impairment Category', 'Impairment', 'Report Date', 'Event Feature Date', 'Value', 'Expanded Value', 'Page'],
      Impairments: ['Impairment Category', 'Impairment', 'Feature', 'Report Date', 'Event Date', 'Clinician Name', 'Clinician Specialty', 'Value', 'Expanded Value', 'Page'],
      Troubleshooting: ['File Name', 'Page Number', 'Problem', 'Severity'],
    },
  };

  namesUpdated = [];
  updateTables(name) {
    if (this.namesUpdated.includes(name)) {
      return;
    }

    if (name === 'General Info') {
      const addItem = () => {
        if (this.generalInfoCoumns.length === 1) {
          const item = this.generalInfoCoumns[0];
          this.generalInfoCoumns.splice(0, 1);
          this.genralInfoFill.push(item);
          this.tables['Troubleshooting'] = this.allData['Troubleshooting'];
          return;
        }
        const i = getRandomSecconds(0, this.generalInfoCoumns.length - 1);
        const item2 = this.generalInfoCoumns[i];
        this.generalInfoCoumns.splice(i, 1);
        this.genralInfoFill.push(item2);
        setTimeout(() => { addItem(); }, 3 * 1000);
      };
      addItem();
      return;
    }
    this.namesUpdated.push(name);

    let index = 0;
    const addItems = () => {
      const arr = this.allData.tables[name];
      if (!arr || !arr.length) return;
      const length = arr.length;
      const start = length < 100 ? index : Math.round((length / 100) * index);
      const end = start + (Math.floor(length / 100) || 1);
      for (let i = start; i < end; i++) {
        if (!arr[i]) break;
        setTimeout(() => { this.tables[name].push(arr[i]); }, Math.random() * 1000);
      }
      index++;
      if (index <= 200) {
        setTimeout(addItems, 1000);
      }
    };
    addItems();

  }

  proccess() {
    if (this.isProccecing) return;
    this.isProccecing = true;
    this.generalInfoCoumns = Object.keys(this.allData.generalInfo);
    const names = [];
    let counter = 0;
    this.files.map((item) => {
      // tslint:disable-next-line:no-console
      new TaskSeq().start(this, item, (name, startEndState) => {
        if (startEndState === 'start') {
          if (!names.includes(name)) {
            names.push(name);
            this.updateTables(name);
          }
        } else {
          counter++;
          if (counter === this.files.length) {
            this.isLeWorking = true;
            this.leWorkingSpeed = 'slow';
            setTimeout(() => {
              this.leWorkingSpeed = 'middle';
              setTimeout(() => {
                this.leWorkingSpeed = 'fast';
                setTimeout(() => {
                  this.leWorkingSpeed = '';
                  this.isLeDone = true;
                }, 6000 * this.speedLe);
              }, 10 * 1000 * this.speedLe);
            }, 15 * 1000 * this.speedLe);
          }
        }
      });
    });

  }
}


class Data {
  files: [];
  tables: {
    Rx: [],
    Lifestyle: any[],
    Labs: any[],
    Test: [],
    Condition: [],
  };
  generalInfo: any = { 'Name': '', 'Gender': '', 'Age': '', 'DOB': '', 'Medical': '', 'Marital': '', 'Street': '', 'State': '', 'SSN': '', 'Hight': '', 'Weight': '', 'BMI': '', 'Smoker': '' };
  impiremants: any = {};
  medication: any = {};
  labs: any = {};
  lifestyle: any = {};
  le: {};
  CD: 0
}

class TaskSeq {
  file: any;
  // tslint:disable-next-line:no-shadowed-variable
  start(data: WorkerServiceService, file, callback) {
    file.seconds = {};
    this.file = file;
    let index = 0;
    // tslint:disable-next-line:no-console
    function level() {
      file.status = data.statusBaseArray[index].name;
      file.seconds[file.status] = getRandomSecconds(data.statusBaseArray[index].minTime,
        data.statusBaseArray[index].maxTime);
      callback(file.status, 'start');
      new Task().start(file.status, file, file.seconds[file.status], 'progressOcr', function () {
        if (index === 0) { // done with OCR
          // const images = getImages(file.seconds[file.status]);
          file.pdfText = 'Text: ' + 0 + '%';
          file.pdfImages = 'Image: ' + 100 + '%';
          file.pdfQuality = 'Quality ' + getLevel();
        }
        index++;
        if (index === data.statusBaseArray.length && callback) {
          callback('end');
        }
        level();
      });
    }
    level();
    // const a = new Task();
    //   a.start(item.status, item, item.max);

  }
}

export class Task {
  status: string;
  ref: object;
  progress: number;
  max: number;
  callback;
  progressFieldName;
  start(status, ref, max, progressFieldName, callback?) {
    this.status = status;
    this.ref = ref;
    this.progress = 0;
    this.max = max;
    this.progressFieldName = progressFieldName;
    this.callback = callback;
    setTimeout(() => { this.onProgress(); }, (max / 100));
  }

  onProgress() {
    // tslint:disable-next-line:no-console
    this.progress++;
    this.ref[this.progressFieldName] = this.progress;
    if (this.progress !== 100) {
      setTimeout(() => { this.onProgress(); }, this.max / 100);
    } else {
      this.callback();
    }
  }
}