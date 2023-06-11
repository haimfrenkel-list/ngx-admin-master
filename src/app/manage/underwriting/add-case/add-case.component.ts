import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { ServerTokenService } from '../../../services/server-token.service';
import { UnderwritingDataService } from '../underwriting-data.service';
import { log } from 'console';
import { HighlightSpanKind } from 'typescript';

@Component({
  selector: 'ngx-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.scss']
})
export class AddCaseComponent implements OnInit {
  @Output() action = new EventEmitter<string>();

  form: FormGroup
  providers: string[] = ["ISC", "LSI", "AVS", "fasano", "21ST", "predictive", "BIMO", "lapetus", "convergence", "clarity", "polaris", "EMSI", "elevation", "midwest", "amscot"]
  POvalues: string[] = ['Level', 'Gonen', 'DataLife', 'LifeRoc', 'Not Relevant', 'Joe Lichter', 'Lewis & Ellis', ' 21st', 'Vida', 'HarborLife']
  groups: string[]
  currentNumber: number
  csvVersion
  changeGroup = false
  equalSSN: boolean = false
  buttonType: string = 'Create'
  newPatientForm: boolean = false
  newCaseForm: boolean = false
  newLEForm: boolean = false

  constructor(private service: ServerTokenService, private serviceData: UnderwritingDataService) { }

  ngOnInit() {
    this.patientFormPage()
    // this.getGroupsTitle()
    // if (this.serviceData.csvVersion || !this.csvVersion) {
    //   this.serviceData.getLastVersion()
    //   this.csvVersion = this.serviceData.csvVersion
    // }
    // this.initForm()

    // if (this.serviceData.caseData) {
    //   this.editData()
    // }
    // this.setBackButton()
  }

  patientFormPage() {
    this.newLEForm = false
    this.newCaseForm = false
    this.newPatientForm = true
  }

  caseFormPage() {
    this.newLEForm = false
    this.newPatientForm = false
    this.newCaseForm = true
  }

  LEFormPage() {
    this.newPatientForm = false
    this.newCaseForm = false
    this.newLEForm = true
  }

  setBackButton() {
    history.pushState(null, '', location.href);
    window.onpopstate = function () {
      history.go(1);
    };
    fromEvent(window, 'popstate').subscribe(() => {
      this.action.emit('underwriting')
    })
  }


  initForm() {
    this.form = new FormGroup({
      "group": new FormControl("New Deals"),
      "FirstName": new FormControl(null),
      "MiddleName": new FormControl(),
      "LastName": new FormControl(null),
      "DOB": new FormControl(),
      "SSN": new FormControl(null, [Validators.required, this.onlyNumbersValidator()]),
      "Address": new FormControl(),
      "Zip code": new FormControl(),
      "Hippa": new FormControl(),
      "Smoke": new FormControl(),
      "Last medical record": new FormControl(),
      "Gender": new FormControl(),
      "Number": new FormControl(),
      "Case": new FormControl(),
      "Carrier": new FormControl(),
      "Policy Form": new FormControl(),
      "Face amount": new FormControl(),
      "Contact name": new FormControl(),
      "Priority": new FormControl(),
      "Lives insured": new FormControl(),
      "NAV": new FormControl(),
      "IRR Gross": new FormControl(),
      "IRR Net": new FormControl(),
      "Closing price": new FormControl(),
      "Premium until age": new FormControl(),
      "Market": new FormControl(),
      "Date of issue": new FormControl(),
      "ILL date": new FormControl(),
      "PLR": new FormControl(),
      "DB factor": new FormControl(),
      "G. int": new FormControl(),
      "Ng. int": new FormControl(),
      "Admin": new FormControl(),
      "face/1000": new FormControl(),
      "Other": new FormControl(),
      "Coverage": new FormControl(),
      "Age calculation": new FormControl(),
      "Value date": new FormControl(),
      "Account value": new FormControl(),
      "Surrender value": new FormControl(),
      "Loan balance": new FormControl(),
      "Phone": new FormControl(),
      "Email": new FormControl(),
      "STOLI/ fraud risk": new FormControl(),
      "Policy number": new FormControl(),
      "Broker": new FormControl(),
      "Rating": new FormControl(),
      "s&p": new FormControl(),
      "fitch": new FormControl(),
      "Moody’s": new FormControl(),
      "AMBEST": new FormControl(),
      'createdBy': new FormControl(),
      'createdOn': new FormControl(new Date()),
      'lastUpdateBy': new FormControl(),
      'lastUpdateOn': new FormControl(),
      'csvVersion': new FormControl(),
      'ProcessStatus': new FormControl(),
      'AssignTo': new FormControl(),
      'caseId': new FormControl(),
      'DB': new FormControl(),
      'State': new FormControl(),
      'state of issue': new FormControl(),
      'PO': new FormControl(),
      'patientId': new FormControl(),
      "source": new FormControl(),
      'Policy type': new FormControl(),
      "Lapse": new FormControl(),
      LEproviders: new FormArray([
        new FormGroup({
          "id": new FormControl(),
          'LE provider': new FormControl(),
          'LE date': new FormControl(),
          'certificate number': new FormControl(),
          'Mean LE': new FormControl(),
          'Median LE': new FormControl(),
          'Primary impairment': new FormControl(),
          'Last medical record': new FormControl(),
          'LE type': new FormControl(),
          'patientID': new FormControl(),
          'caseID': new FormControl(),
        })
      ]),
    })
    if (!this.serviceData.caseData) {
      this.subSSNChanges()
      this.subNameChanges()
    }

  }

  editData() {
    let data = this.serviceData.caseData
    console.log(data);
    this.form.controls["group"].setValue(data["group"])
    this.form.controls["FirstName"].setValue(data['patient']["FirstName"])
    this.form.controls["MiddleName"].setValue(data['patient']["MiddleName"])
    this.form.controls["LastName"].setValue(data['patient']["LastName"])
    this.form.controls["DOB"].setValue(data.patient.DOB ? data.patient.DOB.split('T')[0] : null)
    this.form.controls["SSN"].setValue(data['patient']["SSN"])
    this.form.controls["Address"].setValue(data["Address"])
    this.form.controls["Zip code"].setValue(data["Zip code"])
    this.form.controls["Hippa"].setValue(data['patient']["Hippa"])
    this.form.controls["Smoke"].setValue(data['patient']["Smoke"] == 'S' ? true : false)
    this.form.controls["Last medical record"].setValue(data['patient']["Last medical record"] ? data['patient']["Last medical record"].split('T')[0] : null)
    this.form.controls["Gender"].setValue(data['patient']["Gender"])
    this.form.controls["Number"].setValue(data["Number"])
    this.form.controls["Case"].setValue(data["Case"])
    this.form.controls["Carrier"].setValue(data["Carrier"])
    this.form.controls["Policy Form"].setValue(data["Policy Form"])
    this.form.controls["Face amount"].setValue(data["Face amount"])
    this.form.controls["Contact name"].setValue(data["Contact name"])
    this.form.controls["Priority"].setValue(data["Priority"])
    this.form.controls["Lives insured"].setValue(data["Lives insured"])
    this.form.controls["NAV"].setValue(data["NAV"])
    this.form.controls["DB"].setValue(data["DB"])
    this.form.controls["State"].setValue(data["State"])
    this.form.controls["state of issue"].setValue(data["state of issue"])
    this.form.controls["PO"].setValue(data["PO"])
    this.form.controls["IRR Gross"].setValue(data["IRR Gross"])
    this.form.controls["IRR Net"].setValue(data["IRR Net"])
    this.form.controls["Closing price"].setValue(data["Closing price"])
    this.form.controls["Premium until age"].setValue(data["Premium until age"])
    this.form.controls["Market"].setValue(data["Market"])
    this.form.controls["Date of issue"].setValue(data["Date of issue"] ? data["Date of issue"].split('T')[0] : null)
    this.form.controls["ILL date"].setValue(data["ILL date"] ? data["ILL date"].split('T')[0] : null)
    this.form.controls["PLR"].setValue(data["PLR"])
    this.form.controls["DB factor"].setValue(data["DB factor"])
    this.form.controls["G. int"].setValue(data["G. int"])
    this.form.controls["Ng. int"].setValue(data["Ng. int"])
    this.form.controls["Admin"].setValue(data["Admin"])
    this.form.controls["face/1000"].setValue(data["face/1000"])
    this.form.controls["Other"].setValue(data["Other"])
    this.form.controls["Coverage"].setValue(data["Coverage"])
    this.form.controls["Age calculation"].setValue(data["Age calculation"])
    this.form.controls["Value date"].setValue(data["Value date"] ? data["Value date"].split('T')[0] : null)
    this.form.controls["Account value"].setValue(data["Account value"])
    this.form.controls["Surrender value"].setValue(data["Surrender value"])
    this.form.controls["Loan balance"].setValue(data["Loan balance"])
    this.form.controls["Phone"].setValue(data["Phone"])
    this.form.controls["Email"].setValue(data["Email"])
    this.form.controls["STOLI/ fraud risk"].setValue(data["STOLI/ fraud risk"])
    this.form.controls["Policy number"].setValue(data["Policy number"])
    this.form.controls["Broker"].setValue(data["Broker"])
    this.form.controls["Rating"].setValue(data["Rating"])
    this.form.controls["s&p"].setValue(data["s&p"])
    this.form.controls["fitch"].setValue(data["fitch"])
    this.form.controls["Moody’s"].setValue(data["Moody’s"])
    this.form.controls["AMBEST"].setValue(data["AMBEST"])
    this.form.controls['createdBy'].setValue(data["createdBy"])
    this.form.controls['createdOn'].setValue(data["createdOn"])
    this.form.controls['lastUpdateBy'].setValue(data["lastUpdateBy"])
    this.form.controls['lastUpdateOn'].setValue(data["lastUpdateOn"])
    this.form.controls['csvVersion'].setValue(data["csvVersion"])
    this.form.controls['ProcessStatus'].setValue(data["ProcessStatus"])
    this.form.controls['AssignTo'].setValue(data["AssignTo"])
    this.form.controls['patientId'].setValue(data['patient']["id"])
    this.form.controls['caseId'].setValue(data["id"])
    this.form.controls['source'].setValue(data['source'])
    this.form.controls['Policy type'].setValue(data["Policy type"])
    this.form.controls['Lapse'].setValue(data['Lapse'])
    data.LEs.forEach((value, index) => {
      if (!this.LEproviders.at(index)) {
        this.addLEproviders()
      }
      if (value["LE provider"]) {
        this.LEproviders.at(index).setValue(value)
      }
    });
    setTimeout(() => {
      this.subGroupChanges()
    }, 500);
    this.subSSNChanges()
    this.subNameChanges()
    this.buttonType = 'Update'
  }

  get LEproviders() {
    return this.form.controls["LEproviders"] as FormArray
  }

  subSSNChanges() {
    this.form.get('SSN').valueChanges.pipe(debounceTime(500)).subscribe(data => {
      let first = this.form.get('FirstName').value
      let last = this.form.get('LastName').value
      let SSN = this.form.get('SSN').value
      this.service.getWithToken(`underwriting/checkExsistingCases/${SSN}/${first}/${last}`).subscribe(res => {
        if (res['equal']) {
          alert(res['msg'])
          if (res["equal"] === 'SSN') {
            this.equalSSN = true
          } else {
            this.equalSSN = false
          }
        }

      })
    })
  }

  subNameChanges() {
    this.form.get('LastName').valueChanges.pipe(debounceTime(500)).subscribe(data => {
      let first = this.form.get('FirstName').value
      let last = this.form.get('LastName').value
      let SSN = this.form.get('SSN').value ? this.form.get('SSN').value : null
      this.service.getWithToken(`underwriting/checkExsistingCases/${SSN}/${first}/${last}`).subscribe(res => {
        if (res['equal']) {
          alert(res['msg'])
          if (res["equal"] === 'SSN') {
            this.equalSSN = true
          } else {
            this.equalSSN = false
          }
        }
      })
    })
  }

  subGroupChanges() {
    this.form.get('group').valueChanges.subscribe(data => {
      this.changeGroup = true
    })
  }


  onlyNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isNumber = /^[0-9]*$/.test(control.value);
      return isNumber ? null : { 'onlyNumbers': { value: control.value } };
    };
  }

  addLEproviders() {
    const LEprovidersform = new FormGroup({
      "id": new FormControl(),
      'LE provider': new FormControl(),
      'LE date': new FormControl(),
      'certificate number': new FormControl(),
      'Mean LE': new FormControl(),
      'Median LE': new FormControl(),
      'Primary impairment': new FormControl(),
      'Last medical record': new FormControl(),
      'LE type': new FormControl(),
      'patientID': new FormControl(),
      'caseID': new FormControl(),
    });
    this.LEproviders.push(LEprovidersform);
  }

  removePro(i: number) {
    this.LEproviders.removeAt(i)
  }

  getNumber() {

  }

  setCase() {
    this.service.getWithToken('underwriting/getHighNum').subscribe((res: any) => {
      if (res) {
        this.currentNumber = res + 1
      } else {
        this.currentNumber = 5000
      }
      this.form.get('Number').setValue(this.currentNumber)
      let first = this.form.get('FirstName').value
      let last = this.form.get('LastName').value
      this.form.get('Case').setValue(`${first[0]}${last[0]}${this.currentNumber}`)
    })

  }

  getLastVersion() {
    let last
    return this.service.getWithToken('underwriting/getVer').pipe(tap(version => {
      this.csvVersion = version['vers'].version
    }))
  }

  createMsg() {
    let msg = {
      User: this.form.get('AssignTo').value,
      Case: this.form.get('Case').value,
      Date: new Date().toLocaleString(),
      Text: this.getMsgText(this.form.get('ProcessStatus').value),
      Type: 'task',
      Accepted: false
    }
    return msg
  }

  getMsgText(status: string) {
    let file = this.form.get('Case').value
    switch (status) {
      case 'Assignment':
        return `Case ${file} is waiting for your underwriting`
        break;
      case 'Review':
        return `Case ${file} is waiting for your review`
        break;
      default:
        return null
        break;
    }
  }


  CreateCase() {
    if (this.equalSSN) {
      alert('Please check SSN')
      return
    }
    let user = JSON.parse(localStorage.getItem('currentUser'))
    if (this.buttonType === 'Create') {
      this.form.get('createdBy').setValue(user['fullName'])
      this.form.get('createdOn').setValue(new Date().toLocaleString())
      this.form.get('lastUpdateBy').setValue(user['fullName'])
      this.form.get('lastUpdateOn').setValue(new Date().toLocaleString())
      this.form.get('csvVersion').setValue(this.csvVersion)
      this.form.get('ProcessStatus').setValue('New')
      this.service.getWithToken('underwriting/getHighNum').subscribe((res: any) => {
        if (res['num']) {
          this.currentNumber = res['num'] + 1
        } else {
          this.currentNumber = 5000
        }
        this.form.get('Number').setValue(this.currentNumber)
        let first = this.form.get('FirstName').value
        let last = this.form.get('LastName').value
        this.form.get('Case').setValue(`${this.currentNumber}${first[0]}${last[0]}`)
        if (this.form.get('source').value === null) {
          alert('Source must be updated')
          return
        }
        this.serviceData.saveUnderwriting(this.form.value).subscribe(res => {
          console.log(res);

          this.serviceData.createNote(this.createMsg())
          this.serviceData.getNtf()
          this.initForm()
        })
      })
    } else if (this.buttonType === 'Update') {
      this.form.get('lastUpdateBy').setValue(user['fullName'])
      this.form.get('lastUpdateOn').setValue(new Date().toLocaleString())
      let caseId = this.serviceData.caseData.id
      this.service.postWithToken(`underwriting/upCase/${caseId}/${this.changeGroup}`, this.form.value).subscribe(data => {
        console.log(data);
        this.changeGroup = false
        this.initForm()
        this.action.emit('dashboard')
      })
    }


  }

  getGroupsTitle() {
    this.service.getWithToken('underwriting/getTitles').subscribe(data => {
      this.groups = data['titles']
      console.log(this.groups);

    })
  }

  transfer(action: string) {
    switch (action) {
      case 'case':
        this.caseFormPage()
        break
      case 'LE':
        this.LEFormPage()
        break
      case 'init':
        this.patientFormPage()
        break
      default:
        break;
    }
  }
}
