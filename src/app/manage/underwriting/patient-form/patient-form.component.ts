import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ServerTokenService } from '../../../services/server-token.service';
import { UnderwritingDataService } from '../underwriting-data.service';
import { debounceTime } from 'rxjs/operators';
import { log } from 'console';
import { LocalDataSource } from 'ng2-smart-table';
import { HighlightSpanKind } from 'typescript';

@Component({
  selector: 'ngx-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {

  @Output() action = new EventEmitter<string>();
  tableData = {}
  csvVersion: number = null
  patientForm: FormGroup
  equalSSN: boolean = false
  groups: string[]
  currentNumber
  updateMode: string = 'Create'
  changeGroup: boolean = false
  showTableData: boolean = false
  checkEquals: boolean = true
  constructor(private service: ServerTokenService, private serviceData: UnderwritingDataService) { }

  ngOnInit() {
    this.initForm()
    this.getGroupsTitle()
    if (this.serviceData.patientData) {
      this.updateMode = 'Update'
      this.editForm(this.serviceData.patientData)
    }
    
  }


  initForm() {
    this.patientForm = new FormGroup({
      "FirstName": new FormControl(null),
      "MiddleName": new FormControl(),
      "LastName": new FormControl(null),
      "DOB": new FormControl(),
      "SSN": new FormControl(null, [Validators.required, this.onlyNumbersValidator()]),
      "Address": new FormControl(),
      "state": new FormControl(),
      "Zip code": new FormControl(),
      "Hippa": new FormControl(),
      "Smoke": new FormControl(),
      "Last medical record": new FormControl(),
      "Gender": new FormControl(),
      "group": new FormControl("New Deals"),
      "source": new FormControl(),
      "Number": new FormControl(),
      "Case": new FormControl(),
      'csvVersion': new FormControl(),
      'createdBy': new FormControl(),
      'createdOn': new FormControl(new Date()),
      'ProcessStatus': new FormControl(),
    })
    this.subSSNChanges()
    this.subNameChanges()
    this.setGroupTitle()
  }

  editForm(data: any) {
    this.checkEquals = false
    this.patientForm.controls["FirstName"].setValue(data["FirstName"])
    this.patientForm.controls["MiddleName"].setValue(data["MiddleName"])
    this.patientForm.controls["LastName"].setValue(data["LastName"])
    this.patientForm.controls["DOB"].setValue(data.DOB ? data.DOB.split('T')[0] : null)
    this.patientForm.controls["SSN"].setValue(data["SSN"])
    this.patientForm.controls["Address"].setValue(data["Address"])
    this.patientForm.controls["Zip code"].setValue(data["Zip code"])
    this.patientForm.controls["Hippa"].setValue(data["Hippa"])
    this.patientForm.controls["Smoke"].setValue(data["Smoke"] == 'S' ? true : false)
    this.patientForm.controls["Last medical record"].setValue(data["Last medical record"] ? data["Last medical record"].split('T')[0] : null)
    this.patientForm.controls["Gender"].setValue(data["Gender"])
    this.patientForm.controls["group"].setValue(data["group"])
    this.patientForm.controls["source"].setValue(data["source"])
    this.patientForm.controls["Number"].setValue(data["Number"])
    this.patientForm.controls["Case"].setValue(data["Case"])
    this.patientForm.controls["state"].setValue(data["state"])
    setTimeout(() => {
      this.checkEquals = true
    }, 1500);

    this.subGroupChangegs()
  }

  onlyNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isNumber = /^[0-9]*$/.test(control.value);
      return isNumber ? null : { 'onlyNumbers': { value: control.value } };
    };
  }

  subSSNChanges() {
    this.patientForm.get('SSN').valueChanges.pipe(debounceTime(500)).subscribe(data => {
      if (this.checkEquals) {
        let first = this.patientForm.get('FirstName').value
        let last = this.patientForm.get('LastName').value
        let SSN = this.patientForm.get('SSN').value
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
      }
    })
  }

  subNameChanges() {
    this.patientForm.get('LastName').valueChanges.pipe(debounceTime(500)).subscribe(data => {
      if (this.checkEquals) {
        let first = this.patientForm.get('FirstName').value
        let last = this.patientForm.get('LastName').value
        let SSN = this.patientForm.get('SSN').value ? this.patientForm.get('SSN').value : null
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
      }
    })
  }

  subGroupChangegs() {
    this.patientForm.get('group').valueChanges.subscribe(data => {
      this.changeGroup = true
    })
  }

  getGroupsTitle() {
    this.service.getWithToken('underwriting/getTitles').subscribe(data => {
      this.groups = data['titles']
      console.log(this.groups);
    })
  }

  setGroupTitle() {
    if (this.groups) {
      this.patientForm.get("group").setValue('New Deals')

    }
  }

  savePatient() {
    this.service.getWithToken('underwriting/getHighNum').subscribe((res: any) => {
      if (res['num']) {
        this.currentNumber = Number(res['num']) + 1
      } else {
        this.currentNumber = 5000
      }
      let user = JSON.parse(localStorage.getItem('currentUser'))
      this.patientForm.get('Number').setValue(this.currentNumber)
      let first = this.patientForm.get('FirstName').value
      let last = this.patientForm.get('LastName').value
      this.patientForm.get('Case').setValue(`${this.currentNumber}${first[0]}${last[0]}`)
      this.patientForm.get('createdBy').setValue(user['fullName'])
      this.patientForm.get('createdOn').setValue(new Date().toLocaleString())
      this.patientForm.get('ProcessStatus').setValue('New')
      this.service.postWithToken('underwriting/upUnd', this.patientForm.value).subscribe(res => {
        this.serviceData.patientData = res['sqlPatient']
        this.serviceData.caseData =  res['sqlCase']
        this.serviceData.patientData['mongoID'] = res['mongo']
        console.log(this.serviceData.patientData);

        this.action.emit('LE')
      })
    })
  }



  getAllPatients() {
    this.service.getWithToken('underwriting/getCases').subscribe((data: any[]) => {
      this.tableData = {
        title: 'All Patients',
        source: new LocalDataSource(data['data'])
      }
      this.showTableData = true
      this.updateMode = 'patient'
    })
  }

  getAllCases() {
    this.service.getWithToken('underwriting/getAllCasesName').subscribe((data: any[]) => {

      this.tableData = {
        title: 'All Cases',
        source: new LocalDataSource(data)
      }

      this.showTableData = true
      this.updateMode = 'case'
    })
  }

  getData(event) {
    let id = event.data.id
    let caseId = event.data.CaseId
    this.serviceData.getCaseData(id, caseId).subscribe(data => {
      if (!this.serviceData.caseData) {
        return alert("This patient has no case. Only after defining a first case, a second case can be added.")
      }
      if (this.updateMode === 'patient') {
        this.editForm(this.serviceData.patientData)
        let Case = this.serviceData.patientData['Case']
        let text = `Note! When selecting a patient, you will be transferred to a new case form. The case code will be ${Case} - B, the previous case will be changed to ${Case} - B. Are you sure you want to continue? `
        if (window.confirm(text)) {
          this.serviceData.newCaseExsistingPatient = true
          let data = this.serviceData.caseData
          data['Case'] = `${Case} - A`
          data['group'] = this.serviceData.patientData['group']
          data['Gender'] = this.serviceData.patientData['Gender']
          let caseId = this.serviceData.caseData.id
          this.service.postWithToken(`underwriting/updateCaseData/${caseId}/true`, data).subscribe(data => {
            console.log(data);
            this.serviceData.patientData['mondayID'] = data['mondayUpdate']
            this.serviceData.caseData = data['caseData']
            this.serviceData.LEdata = null
            this.action.emit('case')
          })
        }

      } else if (this.updateMode === 'case') {
        alert(`Please enter the second patient's information in the form above. When finished, click 'Add Patient'.`)        
        this.initForm()
      }
    })
  }

  addPatientToCase() {
    this.service.getWithToken('underwriting/getHighNum').subscribe((res: any) => {
      if (res['num']) {
        this.currentNumber = Number(res['num']) + 1
      } else {
        this.currentNumber = 5000
      }
      console.log(this.serviceData['mondayId']);
      this.patientForm.get('Case').setValue(`${this.serviceData.patientData['Case']} - B`)
      this.patientForm.get('Number').setValue(this.currentNumber)
      let body = {
        newPatient: this.patientForm.value,
        oldPatient: this.serviceData.patientData,
        caseData: this.serviceData.caseData
      }
      body.caseData['Lives insured'] = 'Survivor'
      this.service.postWithToken('underwriting/newPatientCase', body).subscribe(data => {
        let checkSuccsess: string = data['sqlPatient']['Case']
        if (checkSuccsess.includes('B')) {
          alert('Patient successfully entered')
          this.initForm()
        }else{
          alert('Something went wrong')
        }
    })
  })

}

updatePatient(move: boolean) {
  let id = this.serviceData.patientData.id
  let data = this.patientForm.value
  data['mondayId'] = this.serviceData.patientData['mondayId']
  console.log(data);
  
  this.service.postWithToken(`underwriting/updatePatientData/${id}/${this.changeGroup}`, data).subscribe(data => {
    if (move) {
      this.action.emit('case')
    } else {
      this.serviceData.patientData = null
      this.serviceData.caseData = null
      this.serviceData.LEdata = null
      this.initForm()
    }
  })

}

settings = {
  mode: 'external',
  add: '',
  edit: {
    editButtonContent: '<i class="nb-edit"></i>',
    saveButtonContent: '<i class="nb-checkmark"></i>',
    cancelButtonContent: '<i class="nb-close"></i>',
  },
  delete: {
    deleteButtonContent: '<i class="nb-trash"></i>',
  },
  columns: {
    FirstName: {
      title: 'First Name',
      type: 'stirng',
    },
    LastName: {
      title: 'Last Name',
      type: 'string',
    },
    Case: {
      title: 'Case',
      type: 'stirng',
    }
  },
};
}
