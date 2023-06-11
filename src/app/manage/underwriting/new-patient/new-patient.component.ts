import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerTokenService } from '../../../services/server-token.service';
import { calcCD } from 'shared';
import { ExportPDFComponent } from '../export-pdf/export-pdf.component';
import { UnderwritingDataService } from '../underwriting-data.service';

@Component({
  selector: 'ngx-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent implements OnInit {
  @Output() ExportInternal = new EventEmitter<boolean>();
  @Output() action = new EventEmitter<string>();

  @ViewChild('toPdf', { static: false }) toPdf: ElementRef;
  @ViewChild('download', { static: false }) download: ElementRef;
  @ViewChild('contentTemplate2', { static: false, read: ExportPDFComponent }) contentTemplate: ExportPDFComponent;

  confirm: boolean = false
  chartData
  minChartData
  impaiement = {}
  severity = {}
  comments: { Impairment: string, comment: string, RecommendedDebit: string, idx: number }[] = []
  types = {}
  renges = {}
  chartBMIData = []
  form: FormGroup
  totalCD: number = 0
  totalMinCD: number = 0
  updateMode: boolean = true
  categorys: string[] = []
  user = JSON.parse(localStorage.getItem('currentUser'))
  charts = {}
  csvVersion: number = null
  statusMode
  usersNames
  constructor(private router: Router, private service: ServerTokenService, public serviceData: UnderwritingDataService) { }

  ngOnInit() {
    this.statusMode = this.serviceData.statusMode
    this.usersNames = this.serviceData.userNames
    if (!this.serviceData.data) {
      alert('An existing case must be selected from the dashboard.')
      // this.initForm()
      // this.getCatgories()
      this.setSubData()
      this.updateMode = false
      this.getLastVersion()
    }
    else {
      this.initForm()
      this.getCatgories()
      this.editForm(this.serviceData.data)
      this.updateMode = true
    }
  }

  initForm() {
    // need to add to all flow: MINdebit/credit, MinDiscretionCD, MinSummrayCD
    
    this.form = new FormGroup({
      'Case': new FormControl(),
      'FirstName': new FormControl(),
      'LastName': new FormControl(),
      'DOB': new FormControl(),
      'Gender': new FormControl(),
      'BMI': new FormControl(),
      'Smoke': new FormControl(),
      'underwriterSmoker': new FormControl(),
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
      'SummrayCD': new FormControl(0),
      'MinSummrayCD': new FormControl(0),
      'DiscretionCD': new FormControl(),
      'MinDiscretionCD': new FormControl(),
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
          'debit/credit': new FormControl(),
          'MINdebit/credit': new FormControl(),
        })
      ]),
      'charts': new FormControl(),
      'LE': new FormControl(),
      'median': new FormControl(),
      'LEdata': new FormControl(),
      'LEage': new FormControl(),
      'medianAge': new FormControl(),
      'MinLE': new FormControl(),
      'MinMedian': new FormControl(),
      'MinLEdata': new FormControl(),
      'MinLEage': new FormControl(),
      'MinMedianAge': new FormControl(),
      'createdBy': new FormControl(),
      'createdOn': new FormControl(new Date()),
      'lastUpdateBy': new FormControl(),
      'lastUpdateOn': new FormControl(),
      'csvVersion': new FormControl(),
      'ProcessStatus': new FormControl(),
      'AssignTo': new FormControl(),
      'generalNotes': new FormControl()
    })
    this.subDOB()
    this.setChartsAndLe()
    this.totalCD = 0
    this.totalMinCD = 0
  }


  editForm(data: any) {
    this.form.controls['Case'].setValue(data.Case)
    this.form.controls['FirstName'].setValue(data.FirstName)
    this.form.controls['LastName'].setValue(data.LastName)
    this.form.controls['DOB'].setValue(data.DOB)
    this.form.controls['Gender'].setValue(data.Gender)
    this.form.controls['BMI'].setValue(data.BMI)
    this.form.controls['Smoke'].setValue(data.Smoke)
    this.form.controls['underwriterSmoker'].setValue(data.underwriterSmoker)
    this.form.controls['SmokingInfo'].setValue(data.SmokingInfo)
    this.form.controls['YearOfQuitting'].setValue(data.YearOfQuitting)
    this.form.controls['NotesForSmoking'].setValue(data.NotesForSmoking)
    this.form.controls['SocialStatus'].setValue(data.SocialStatus)
    this.form.controls['functionalState'].setValue(data.functionalState)
    this.form.controls['mentalState'].setValue(data.mentalState)
    this.form.controls['AmbulationState'].setValue(data.AmbulationState)
    this.form.controls['Address'].setValue(data.Address)
    this.form.controls['State'].setValue(data.State)
    this.form.controls['ZIPcode'].setValue(data.ZIPcode)
    this.form.controls['saleDate'].setValue(data.saleDate)
    this.form.controls['policySize'].setValue(data.policySize)
    this.form.controls['StartDate'].setValue(data.StartDate)
    this.form.controls['EndDate'].setValue(data.EndDate)
    this.form.controls['Age'].setValue(data.Age)
    this.form.controls['FamilyHistory'].setValue(data.FamilyHistory)
    this.form.controls['DiscretionCD'].setValue(data.DiscretionCD)
    this.form.controls['MinDiscretionCD'].setValue(data.MinDiscretionCD)
    this.form.controls['SSN'].setValue(data.SSN)
    this.form.controls['SummrayCD'].setValue(data.SummrayCD)
    this.form.controls['MinSummrayCD'].setValue(data.MinSummrayCD)
    this.form.controls['charts'].setValue(data.charts)
    this.form.controls['LE'].setValue(data.LE)
    this.form.controls['median'].setValue(data.median)
    this.form.controls['LEdata'].setValue(data.LEdata)
    this.form.controls['LEage'].setValue(data.LEage)
    this.form.controls['medianAge'].setValue(data.medianAge)
    this.form.controls['MinLE'].setValue(data.MinLE)
    this.form.controls['MinMedian'].setValue(data.MinMedian)
    this.form.controls['MinLEdata'].setValue(data.MinLEdata)
    this.form.controls['LEage'].setValue(data.LEage)
    this.form.controls['MinMedianAge'].setValue(data.MinMedianAge)
    this.form.controls['createdBy'].setValue(data.createdBy)
    this.form.controls['createdOn'].setValue(data.createdOn)
    this.form.controls['lastUpdateBy'].setValue(data.lastUpdateBy)
    this.form.controls['lastUpdateOn'].setValue(data.lastUpdateOn)
    this.form.controls['csvVersion'].setValue(data.csvVersion)
    this.form.controls['ProcessStatus'].setValue(data.ProcessStatus)
    this.form.controls['AssignTo'].setValue(data.AssignTo)
    this.form.controls['generalNotes'].setValue(data.generalNotes)
    if(data.csvVersion){
      this.csvVersion = data.csvVersion
    } else {
      this.getLastVersion()
    }
    this.csvVersion = data.csvVersion
    if (data.impiaements) {
      data.impiaements.forEach((value, index) => {
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
    }
    if (data.longBMI) {
      data.longBMI.forEach((value, index) => {
        if (!this.longBMI.at(index)) {
          this.addLongBMI()
        }
        if (value.Date) {
          this.longBMI.at(index).setValue(value)
        }
      });
    }
    if (data.bloodTests) {
      data.bloodTests.forEach((value, index) => {
        if (!this.bloodTests.at(index)) {
          this.addBloodTests()
        }
        if (value.Type) {
          this.form.get(['bloodTests', index, 'Type']).setValue(value.Type)
          value['results'].forEach((res, idx) => {
            if (!this.getResults(index).at(idx)) {
              this.addResults(index)
            }
            this.setBloodTestChart(index)
            this.getResults(index).at(idx).setValue(res)
          });
        }
      });
      this.setAge(data.DOB)
    }

    this.totalCD = data.SummrayCD + data.DiscretionCD
    this.charts = data.charts === null ? {} : data.charts
    this.chartData = data.LEdata

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
      'debit/credit': new FormControl(),
      'MINdebit/credit': new FormControl()

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

  setServiceData() {
    this.serviceData.data = this.form.value
  }


  subDOB() {
    this.form.get('DOB').valueChanges.subscribe(date => {
      this.setAge(date)
    })
  }

  setAge(date: any) {
    let jj = new Date(date).getAge()
    let year = Number(new Date(date).getAge().toString().split('.')[0])
    let month = Number((new Date(date).getAge() % 1) * 12);
    this.form.controls['Age'].setValue((`${year}+${month.toFixed()}`))
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
    if (this.comments.length > 0 && !this.confirm) {
      alert('Reference to comments and recommendations must be confirmed')
      return
    }
    if (!this.form.get('Case').value) {
      alert('Looks like you forgot to give a case code')
      return
    }
    let user = JSON.parse(localStorage.getItem('currentUser'))
    // this.downloadPdf()
    if (!this.updateMode) {
      this.form.get('createdBy').setValue(user['fullName'])
      this.form.get('createdOn').setValue(new Date().toLocaleString())
      this.form.get('lastUpdateBy').setValue(user['fullName'])
      this.form.get('lastUpdateOn').setValue(new Date().toLocaleString())
      this.form.get('csvVersion').setValue(this.csvVersion)
      this.serviceData.saveUnderwriting(this.form.value).subscribe(und => {
        this.setServiceData()
        this.exportReport()
        // this.initForm()
        this.comments = []
        this.charts = {}
      })
    } else if (this.updateMode) {
      this.form.get('lastUpdateBy').setValue(user['fullName'])
      this.form.get('lastUpdateOn').setValue(new Date().toLocaleString())
      let Case = this.form.get(['Case']).value
      this.service.postWithToken(`underwriting/upUnd/${Case}`, this.form.value).subscribe(u => {
        console.log(u);

        this.setServiceData()
        this.exportReport()
        // this.initForm()
        this.comments = []
        this.charts = {}
      })
    }
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
    this.sumMinCD()
  }

  sumMinCD() {
    this.totalMinCD = 0
    for (let index = 0; index < this.impiaements.length; index++) {
      if(!this.form.get(['impiaements', index, 'MINdebit/credit']).value || this.form.get(['impiaements', index, 'MINdebit/credit']).value <= 0 ){
        this.totalMinCD = this.totalMinCD + Number(this.form.get(['impiaements', index, 'debit/credit']).value)
      } else {
        this.totalMinCD = this.totalMinCD + Number(this.form.get(['impiaements', index, 'MINdebit/credit']).value)
      }
      
    }
    if(!this.form.get('MinDiscretionCD').value || this.form.get('MinDiscretionCD').value <= 0){
      this.totalMinCD += this.form.get('DiscretionCD').value
    } else {
      this.totalMinCD += this.form.get('MinDiscretionCD').value
    }
    this.form.controls['MinSummrayCD'].setValue(this.totalMinCD)
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
    console.log('in remove');
    
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
        this.initForm()
        this.updateMode = false

      })
    }
  }

  nothing(event: any){
    event.preventDefault();
    
  }

  sortImpairemts(imp: any[]) {
    return imp.sort(((a, b) => a.impairment.localeCompare(b.impairment)))
  }

  calcChart() {
    let Age = this.form.get('DOB').value ? Math.floor(Number(new Date(this.form.get('DOB').value).getAge())) : null
    let Gender = this.form.get('Gender').value
    let smoker = this.form.get('underwriterSmoker').value
    let CD = this.form.get('SummrayCD').value
    let minCD = this.form.get('MinSummrayCD').value
    if (!Gender || Age <= 0) {
      let gender = !Gender ? 'gender,' : ''
      let age = Age <= 0 ? 'age' : ''
      alert(` ${gender} ${age} is missing`)
      return
    }
    let data = new calcCD(Age, Gender, smoker, (CD / 100) + 1).ConvertToPercentages()
    let minData = new calcCD(Age, Gender, smoker, (minCD / 100) + 1).ConvertToPercentages()
    this.chartData = data['chart']
    this.minChartData = minData['chart']
    data['median']
    // MinLEdata MinLEage MinMedianAge MinMedian MinLE
    this.form.get('LEdata').setValue(this.chartData)
    this.form.get('LEage').setValue(`${Number(this.calcLEandMedian(data['average']).years)}+${this.calcLEandMedian(data['average']).months}`)
    this.form.get('medianAge').setValue(`${Number(this.calcLEandMedian(data['median']).years)}+${this.calcLEandMedian(data['median']).months}`)
    this.form.get('median').setValue(data['median'].toFixed(1))
    this.form.get('LE').setValue(data['average'].toFixed(1))
    this.form.get('MinLEdata').setValue(this.minChartData)
    this.form.get('MinLEage').setValue(`${Number(this.calcLEandMedian(minData['average']).years)}+${this.calcLEandMedian(minData['average']).months}`)
    this.form.get('MinMedianAge').setValue(`${Number(this.calcLEandMedian(minData['median']).years)}+${this.calcLEandMedian(minData['median']).months}`)
    this.form.get('MinMedian').setValue(minData['median'].toFixed(1))
    this.form.get('MinLE').setValue(minData['average'].toFixed(1))
    this.initChart()
    this.initMinChart()
  }

  calcLEandMedian(date: number) {
    let ageYears = this.form.get('Age').value?  Number((this.form.get('Age').value).split('+')[0]) : 0
    let ageMonths = this.form.get('Age').value?  Number((this.form.get('Age').value).split('+')[1]) : 0
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

  initMinChart() {
    let xArray = [];
    let lives = []
    let deads = []
    let probability = []
    for (let i = 0; i < 220; i++) {
      let live = this.minChartData[i].lives
      let dead = this.minChartData[i].deth
      let pre = this.minChartData[i].pre
      xArray.push(i);
      lives.push(live)
      deads.push(dead)
      probability.push(pre)
    }
    this.charts['MinLE'] = {
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
    this.charts['Minprob'] = {
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
    console.log(data[0].Date);
    
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