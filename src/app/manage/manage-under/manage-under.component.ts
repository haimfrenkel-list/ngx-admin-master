import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { log } from 'console';
import { calcCD } from 'shared';
import { ServerTokenService } from '../../services/server-token.service';
import { WorkerServiceService } from '../../services/worker-service.service';
import { UnderwritingDataService } from '../underwriting/underwriting-data.service';

@Component({
  selector: 'ngx-manage-under',
  templateUrl: './manage-under.component.html',
  styleUrls: ['./manage-under.component.scss']
})
export class ManageUnderComponent implements OnInit {
  @Output() ExportInternal = new EventEmitter<boolean>();
  @Output() action = new EventEmitter<string>();

  confirm: boolean = false
  chartData
  impaiement = {}
  severity = {}
  comments: { Impairment: string, comment: string, RecommendedDebit: string, idx: number }[] = []
  types = {}
  renges = {}
  chartBMIData = []
  form: FormGroup
  totalCD: number = 0
  updateMode: boolean = true
  categorys: string[] = []
  user = JSON.parse(localStorage.getItem('currentUser'))
  charts = {}
  csvVersion: number = null
  statusMode
  usersNames
  jobs = []
  caseSelected: boolean = false
  currentJob
  dataEdited: boolean = false
  status
  demoTabels = {
    files: null,
    tables: {
      Rx: null,
      Lifestyle: null,
      Labs: null,
      Test: null,
      Condition:null,
    },
    generalInfo: null,
    impiremants:null,
    medication: null,
    labs: null,
    lifestyle:null,
    le: null,
    CD: null,
  }

  constructor(private router: Router, private service: ServerTokenService, public serviceData: UnderwritingDataService, protected workerService: WorkerServiceService) { }

  ngOnInit() {
    this.getJobs()
    this.getCatgories()
    this.getLastVersion()
  }

  getJobs() {
    this.service.getWithToken('workflow/getJobs').subscribe(data => {
      let jobs = Object.keys(data)
      for (let i = 0; i < jobs.length; i++) {
        let jobId = jobs[i]
        this.jobs.push({ jobId: jobs[i], Case: data[jobId].job['dirName'] })
      }
    })
    console.log(this.jobs);

  }

  initForm(job: any) {
    if(!this.workerService.allData){
      this.workerService.allData = this.demoTabels
    }
    this.currentJob = job
    this.checkStatus(job['jobId'])
    this.form = new FormGroup({
      'Case': new FormControl(job['Case']),
      'FirstName': new FormControl(),
      'LastName': new FormControl(),
      'DOB': new FormControl(),
      'Gender': new FormControl(),
      'BMI': new FormControl(),
      'Smoke': new FormControl(),
      'SmokingInfo': new FormControl(),
      'YearOfQuitting': new FormControl(),
      'NotesForSmoking': new FormControl(),
      'SocialStatus': new FormControl(),
      'functionalState': new FormControl(),
      'mentalState': new FormControl(),
      'AmbulationState': new FormControl(),
      'Address': new FormControl(),
      'State': new FormControl(),
      'ZIPcode': new FormControl(),
      'saleDate': new FormControl(),
      'policySize': new FormControl(),
      'SSN': new FormControl(),
      'StartDate': new FormControl(),
      'EndDate': new FormControl(),
      'Age': new FormControl(),
      'FamilyHistory': new FormControl(),
      'SummrayCD': new FormControl(),
      'DiscretionCD': new FormControl(),
      longBMI: new FormArray([
        new FormGroup({
          'Date': new FormControl(),
          'value': new FormControl(),
        })
      ]),
      bloodTests: new FormArray([
        new FormGroup({
          'Type': new FormControl(''),
          results: new FormArray([
            new FormGroup({
              'Date': new FormControl(),
              'Value': new FormControl()
            })
          ])
        })
      ]),
      impiaements: new FormArray([
        new FormGroup({
          'category': new FormControl(),
          'impairment': new FormControl(),
          'severity': new FormControl(),
          'type': new FormControl(),
          'range': new FormControl(),
          'LocationInDocument': new FormControl(),
          'note': new FormControl(),
          'debit/credit': new FormControl()
        })
      ]),
      'charts': new FormControl(),
      'LE': new FormControl(),
      'median': new FormControl(),
      'LEdata': new FormControl(),
      'LEage': new FormControl(),
      'medianAge': new FormControl(),

    })
    this.setAge()
    this.setChartsAndLe()
    this.totalCD = 0
  
  }


  editForm() {
    if (!this.workerService.allData.generalInfo) {
      return
    }
    let generalInfo = this.workerService.allData.generalInfo
    let data = this.workerService.generalData
    let CD = this.workerService.allData.CD
    // this.form.controls['FirstName'].setValue(data.FirstName)
    // this.form.controls['LastName'].setValue(data.LastName)
    this.form.controls['DOB'].setValue(generalInfo['DOB'] ? new Date(generalInfo['DOB']) : this.form.get('DOB').value)
    this.form.controls['Gender'].setValue(generalInfo['Gender'] ? generalInfo['Gender'] : this.form.get('Gender').value)
    this.form.controls['BMI'].setValue(generalInfo['BMI'] ? generalInfo['BMI'] : this.form.get('BMI').value)
    this.form.controls['Smoke'].setValue(generalInfo['Smoke'] ? generalInfo['Smoke'] : this.form.get('Smoke').value)
    this.form.controls['Address'].setValue(generalInfo['Address'] ? generalInfo['Address'] : this.form.get('Address').value)
    this.form.controls['State'].setValue(generalInfo['State'] ? generalInfo['State'] : this.form.get('State').value)
    this.form.controls['StartDate'].setValue(generalInfo['StartDate'] ? generalInfo['StartDate'] : this.form.get('StartDate').value)
    this.form.controls['EndDate'].setValue(generalInfo['EndDate'] ? generalInfo['EndDate'] : this.form.get('EndDate').value)
    this.form.controls['Age'].setValue(generalInfo['Age'] ? generalInfo['Age'] : this.form.get('Age').value)
    this.form.controls['SummrayCD'].setValue(CD ? CD : this.form.get('SummrayCD').value)
    this.form.controls['SSN'].setValue(generalInfo['SSN'] ? generalInfo['SSN'] : this.form.get('SSN').value)
    this.form.controls['DiscretionCD'].setValue(data.editedCD ? data.editedCD : 0)
    data.impairment.forEach((value, index) => {
      if (!this.impiaements.at(index)) {
        this.addImpiaements()
      }
      if (value.category) {
        if (!this.impaiement[value.category]) {
          this.getImpaiement(null, value.category)
          if (value.severity || value.type || value.range) {
            this.getSeverity(index, value.impairment)
          } else {
            this.getComments(value.impairment, index)
          }
        }
        this.impiaements.at(index).setValue(value)
      }
    });
    // this.form.controls['SummrayCD'].setValue(data.SummrayCD)
    // this.form.controls['charts'].setValue(data.charts)
    // this.form.controls['LE'].setValue(data.LE)
    // this.form.controls['median'].setValue(data.median)
    // this.form.controls['LEdata'].setValue(data.LEdata)
    // this.form.controls['LEage'].setValue(data.LEage)
    // this.form.controls['medianAge'].setValue(data.medianAge)
    // this.charts = data.charts
    // this.chartData = data.LEdata

    this.setSubData()
  }

  get impiaements() {
    return this.form.controls["impiaements"] as FormArray
  }

  get longBMI() {
    return this.form.controls["longBMI"] as FormArray
  }

  get bloodTests() {
    return this.form.controls["bloodTests"] as FormArray
  }

  getResults(idx: number) {
    return this.bloodTests.at(idx).get("results") as FormArray
  }

  reports(action: string) {
    this.action.emit(action)
  }

  addImpiaements() {
    const impiaementsform = new FormGroup({
      'category': new FormControl(),
      'impairment': new FormControl(),
      'severity': new FormControl(),
      'type': new FormControl(),
      'range': new FormControl(),
      'LocationInDocument': new FormControl(),
      'note': new FormControl(),
      'debit/credit': new FormControl()
    });
    this.impiaements.push(impiaementsform);
  }

  addLongBMI() {
    const longBMIform = new FormGroup({
      'Date': new FormControl(),
      'value': new FormControl()
    });
    this.longBMI.push(longBMIform);
  }


  addBloodTests() {
    const bloodTestsform = new FormGroup({
      'Type': new FormControl(''),
      results: new FormArray([
        new FormGroup({
          'Date': new FormControl(),
          'Value': new FormControl()
        })
      ])
    });
    this.bloodTests.push(bloodTestsform);
  }

  addResults(idx: number) {
    const resultsForm = new FormGroup({
      'Date': new FormControl(),
      'Value': new FormControl()
    });
    this.getResults(idx).push(resultsForm);
  }


  checkStatus(jobId) {
    this.service.postWithToken<any>('workflow/getJobStatus', { jobId: jobId }).subscribe(data => {
      if (data && data.generalInfo) {
        this.workerService.genralInfoFill = Object.keys(data.generalInfo);
        this.workerService.allData['generalInfo'] = data.generalInfo;
      }
      this.status = data.status
      if (!this.dataEdited) {
        this.editForm()
        this.dataEdited = true
      }
     
      if (data && data.status == 'Done') {
        return
      }
      setTimeout(this.checkStatus.bind(this), 2000, jobId);

    })
  }
  setServiceData() {
    this.serviceData.data = this.form.value
  }


  setAge() {
    this.form.get('DOB').valueChanges.subscribe(date => {

      let jj = new Date(date).getAge()
      let year = Number(new Date(date).getAge().toString().split('.')[0])
      let month = Number((new Date(date).getAge() % 1) * 12);
      this.form.controls['Age'].setValue((`${year}+${month.toFixed()}`))
    })
  }

  getCatgories() {
    this.service.getWithToken('underwriting/getCat').subscribe(ca => {
      this.categorys = ca[0]['categories']
      this.categorys.sort(((a, b) => a.localeCompare(b)))
    })
  }

  getImpaiement(i: number, editValue?: string) {

    let category = editValue ? editValue : this.form.get(['impiaements', i, 'category']).value
    this.service.getWithToken(`underwriting/getByCat/${category}/${this.csvVersion}`).subscribe((im: any[]) => {
      if (!editValue) { this.form.get(['impiaements', i, 'severity']).setValue(null) }
      im.sort(((a, b) => a.impairment.localeCompare(b.impairment)))
      this.impaiement[category] = im
    })
  }

  getSeverity(i: number, editValue?: string) {
    let impairment = editValue ? editValue : this.form.get(['impiaements', i, 'impairment']).value;
    this.getComments(impairment, i)
    if (!this.severity[impairment]) {
      this.service.getWithToken(`underwriting/allServ/${impairment}/${this.csvVersion}`).subscribe(se => {
        if (se[0].severity) { se[0].severity.push('Unknown') }
        this.severity[impairment] = se[0].severity
        if (se[0].Type) { se[0].Type.push('Unknown') }
        this.types[impairment] = se[0].type
        if (se[0].RANGE) { se[0].RANGE.push('Unknown') }
        this.renges[impairment] = se[0].range
      })
    }
  }

  getComments(impairment: string, idx: number) {
    this.service.getWithToken(`underwriting/getCom/${impairment}/${this.csvVersion}`).subscribe(com => {
      let i = this.comments.findIndex((coment) => coment.idx === idx)
      if (i >= 0) {
        if (!com[0].Comment && !com[0].RecommendedDebit) { this.comments.splice(i, 1); return }
        this.comments[i] = {
          Impairment: impairment,
          comment: com[0].Comment,
          RecommendedDebit: com[0].RecommendedDebit,
          idx: idx
        }
      } else {
        if (!com[0].Comment && !com[0].RecommendedDebit) { return }
        this.comments.push({
          Impairment: impairment,
          comment: com[0].Comment,
          RecommendedDebit: com[0].RecommendedDebit,
          idx: idx
        })
      }
    })
  }


  save() {
    // if(this.status != 'Extracting data'){
    //   alert('Saving information is only possible when the job status is Extracting data')
    // }
    let body = {
      DOB: this.form.get('DOB').value,
      Gender: this.form.get('Gender').value,
      Smoke: this.form.get('Smoke').value ? this.form.get('Smoke').value : false,
      Case: this.form.get('Case').value,
      BMI: this.form.get('BMI').value,
      Age: this.form.get('Age').value,
      StartDate: this.form.get('StartDate').value,
      EndDate: this.form.get('EndDate').value,
      MainContributingFactors: '',
      CD: this.form.get('SummrayCD').value
    }
    for (let i = 0; i < this.impiaements.length; i++) {
      body['MainContributingFactors'] += `${this.form.get(['impiaements', i, 'category']).value} - ${this.form.get(['impiaements', i, 'impairment']).value}, `
    }
    this.service.postWithToken(`workflow/changeJob/${this.currentJob['jobId']}`, body).subscribe(data => {
      this.dataEdited = false
      this.saveImpairment()
      alert('The data has been successfully updated')
    })

  }

  saveImpairment(){
    this.workerService.generalData.impairment = this.impiaements.value
    this.workerService.generalData.editedCD = this.form.get('DiscretionCD').value
  }

  getLastVersion() {
    if (!this.csvVersion)
      this.serviceData.getLastVersion().subscribe(ver => {
        this.csvVersion = this.serviceData.csvVersion
      })



  }

  sumCD() {
    this.totalCD = 0
    for (let index = 0; index < this.impiaements.length; index++) {
      this.totalCD = this.totalCD + Number(this.form.get(['impiaements', index, 'debit/credit']).value)
    }
      this.totalCD += this.form.get('DiscretionCD').value
    this.form.controls['SummrayCD'].setValue(this.totalCD)
  }

  setChartsAndLe() {
    this.form.get('SummrayCD').valueChanges.subscribe(date => {
      this.calcChart()

    })
    this.longBMI.valueChanges.subscribe(data => {
      this.initBMIChart()
    })
  }

  setBloodTestChart(idx: number) {
    this.bloodTests.at(idx).valueChanges.subscribe(data => {
      this.initBloodTestChart(idx)
    })
  }

  setSubData() {
    this.form.valueChanges.subscribe(data => {
      this.setServiceData()
    })
  }


  removeImp(idx: number) {
    let impairment = this.form.get(['impiaements', idx, 'impairment']).value
    this.impiaements.removeAt(idx)
    this.sumCD()
    this.comments.splice(this.comments.findIndex((comment) => comment.idx === idx), 1)
    this.comments.forEach((element) => {
      if (element.idx > idx) {
        element.idx = element.idx - 1
      }
    })
    if (this.impiaements.length == 0) {
      this.addImpiaements()
    }
  }

  removeLongBMI(idx: number) {
    this.longBMI.removeAt(idx)
    if (this.longBMI.length == 0) {
      this.addLongBMI()
    }
  }

  removeBloodTests(idx: number) {
    if (window.confirm('Are you sure you want to delete all results of this type?')) {
      this.bloodTests.removeAt(idx)
      if (this.bloodTests.length == 0) {
        this.addBloodTests()
      }
    }
  }

  removeResults(testIdx: number, resIdx: number) {
    this.getResults(testIdx).removeAt(resIdx)
    if (this.getResults(testIdx).length == 0) {
      this.addResults(testIdx)
    }
  }


  confirmDetalis() {
    this.confirm = true
  }

  deleteUnder(Case: string, fromForm?: boolean) {
    if (window.confirm(`Are you sure you want to delete ${Case}`)) {
      this.service.deleteWithToken(`underwriting/delUnd/:${Case}`).subscribe(res => {
        // this.initForm()
        this.updateMode = false

      })
    }
  }


  sortImpairemts(imp: any[]) {
    return imp.sort(((a, b) => a.impairment.localeCompare(b.impairment)))
  }

  calcChart() {
    let Age = this.form.get('DOB').value ? Math.floor(Number(new Date(this.form.get('DOB').value).getAge())) : null
    let Gender = this.form.get('Gender').value
    let smoker = this.form.get('Smoke').value
    let CD = this.form.get('SummrayCD').value
    if (!CD || !Gender || Age <= 0) {
      let cd = !CD ? 'debit,' : ''
      let gender = !Gender ? 'gender,' : ''
      let age = Age <= 0 ? 'age' : ''
      alert(`${cd} ${gender} ${age} is missing`)
      return
    }
    let data = new calcCD(Age, Gender, smoker, (CD / 100) + 1 + 0.7).ConvertToPercentages()
    this.chartData = data['chart']


    data['median']
    this.form.get('LEdata').setValue(this.chartData)
    this.form.get('LEage').setValue(`${Number(this.calcLEandMedian(data['average']).years)}+${this.calcLEandMedian(data['average']).months}`)
    this.form.get('medianAge').setValue(`${Number(this.calcLEandMedian(data['median']).years)}+${this.calcLEandMedian(data['median']).months}`)
    this.form.get('median').setValue(data['median'].toFixed(1))
    this.form.get('LE').setValue(data['average'].toFixed(1))
    this.initChart()
  }

  calcLEandMedian(date: number) {
    let ageYears = Number((this.form.get('Age').value).split('+')[0])
    let ageMonths = Number((this.form.get('Age').value).split('+')[1])
    let year = Number((date / 12).toString().split('.')[0]) + ageYears
    let month = Number((((date / 12) % 1) * 12)) + ageMonths
    if (month > 11) {
      let splitMonth = month / 12
      year = year + Number(splitMonth.toString().split('.')[0])
      month = (Number(splitMonth.toString().split('.')[1]) % 1 * 12) + ageMonths
    }
    return { years: year, months: month.toFixed() }
  }

  initChart() {
    let xArray = [];
    let lives = []
    let deads = []
    let probability = []
    for (let i = 0; i < 220; i++) {
      let live = this.chartData[i].lives
      let dead = this.chartData[i].deth
      let pre = this.chartData[i].pre
      xArray.push(i);
      lives.push(live)
      deads.push(dead)
      probability.push(pre)
    }
    this.charts['LE'] = {
      xArray: xArray,
      series: [{

        name: 'lives',
        type: 'line',
        color: '#E98126',
        data: lives,

        lineStyle: {
          width: 4,
        }
      },
      {
        name: 'deth',
        type: 'line',
        color: '#37818D',
        data: deads,

        lineStyle: {
          width: 4,
        }
      }
      ],
      title: 'lives & dead'
    }
    this.charts['prob'] = {
      xArray: xArray,
      series: [{

        name: 'probability',
        type: 'line',
        color: '#E98126',
        data: probability,

        lineStyle: {
          width: 4,
        }
      }],
      title: 'probability'
    }
    this.form.get('charts').setValue(this.charts)
  }

  initBMIChart() {
    let xArray = []
    let yArray = []
    let data: any[] = this.longBMI.value
    data.sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime())
    for (let i = 0; i < this.longBMI.length; i++) {
      let date = data[i].Date
      let value = data[i].value
      xArray.push(date)
      yArray.push(value)
      this.chartBMIData.push({ date: date, value: value })
    }
    this.charts['BMI'] = {
      xArray: xArray,
      series: [{
        name: 'values',
        type: 'line',
        color: '#E98126',
        data: yArray,
        lineStyle: {
          width: 4,
        }
      }],
      title: 'BMI'
    }
    this.form.get('charts').setValue(this.charts)
  }

  initBloodTestChart(idx: number) {
    let tests = this.getResults(idx).value
    tests.sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime())
    let xArray = []
    let yArray = []
    let title = this.form.get(['bloodTests', idx, 'Type']).value
    for (let i = 0; i < tests.length; i++) {
      let date = tests[i].Date
      let value = tests[i].Value
      xArray.push(date)
      yArray.push(value)
    }
    this.charts[title] = {
      xArray: xArray,
      series: [{
        name: 'values',
        type: 'line',
        color: '#E98126',
        data: yArray,
        lineStyle: {
          width: 4,
        }
      }],
      title: title
    }
    this.form.get('charts').setValue(this.charts)
  }

  exportReport() {
    if (window.confirm('Would you like to save the underwriting as a pdf report?')) {
      this.ExportInternal.emit(true)
    }
  }

}
