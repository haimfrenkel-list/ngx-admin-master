import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServerTokenService } from '../../../services/server-token.service';
import { UnderwritingDataService } from '../underwriting-data.service';
import { log } from 'console';
import { DecimalPipe, PercentPipe } from '@angular/common';
import * as XLSX from 'xlsx';
// import { ConvertExcel } from 'shared';

@Component({
  selector: 'ngx-case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.component.scss']
})
export class CaseFormComponent implements OnInit {

  @Output() action = new EventEmitter<string>();

  STOLI: string[] = ["Low", "Medium", "High", "Unknown"]
  POvalues: string[] = ['Level', 'Gonen', 'DataLife', 'LifeRoc', 'Not Relevant', 'Joe Lichter', 'Lewis & Ellis', ' 21st', 'Vida', 'HarborLife']
  policyTypeValues: string[] = ['Whole', 'UL', 'Term', 'Group UL', 'Group Term', 'IUL', 'VUL', 'CUL', 'GUL']
  caseForm: FormGroup
  carrierForm: FormGroup
  updateMode: string = 'Create'
  carriers: any[] = []
  fees: any[] = [
    { value: 'PLR', note: 'PLR note' },
    { value: 'DB factor', note: 'DB factor note' },
    { value: 'DB', note: 'DB note' },
    { value: 'G. int', note: 'G. int note' },
    { value: 'Ng. int', note: 'Ng. int note' },
    { value: 'Admin', note: 'Admin note' },
    { value: 'face/1000', note: 'face/1000 note' },
    { value: 'Other', note: 'Other note' },
    { value: 'Coverage', note: 'Coverage note' },
    { value: 'G. M&E', note: 'G. M&E note' },
    { value: 'Current M&E', note: 'Current M&E note' },
    { value: 'Persistency Bonus', note: 'Persistency Bonus note' }
  ]

 
constructor(private service: ServerTokenService, private serviceData: UnderwritingDataService, private decimalPipe: DecimalPipe, private percentPipe: PercentPipe) { }

ngOnInit() {
  this.getCarriersNames()
  this.initForm()
  if (this.serviceData.newCaseExsistingPatient) {
    this.setCase(true)
  } else if (this.serviceData.caseData) {
    this.editForm(this.serviceData.caseData)
    this.updateMode = 'Update'
  }
}

initForm() {
  this.caseForm = new FormGroup({
    "Case": new FormControl(),
    "Number": new FormControl(),
    "source": new FormControl(),
    "Carrier": new FormControl(),
    "group": new FormControl(),
    "Policy Form": new FormControl(),
    "Face amount": new FormControl(),
    "Net Face amount": new FormControl(),
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
    'DB': new FormControl(),
    "G. int": new FormControl(),
    "Ng. int": new FormControl(),
    "Admin": new FormControl(),
    "face/1000": new FormControl(),
    "Other": new FormControl(),
    "Coverage": new FormControl(),
    "Persistency Bonus": new FormControl(),
    "G. M&E": new FormControl(),
    "Current M&E": new FormControl(),
    "PLR note": new FormControl(),
    "DB factor note": new FormControl(),
    'DB note': new FormControl(),
    "G. int note": new FormControl(),
    "Ng. int note": new FormControl(),
    "Admin note": new FormControl(),
    "face/1000 note": new FormControl(),
    "Other note": new FormControl(),
    "Coverage note": new FormControl(),
    "Persistency Bonus note": new FormControl(),
    "G. M&E note": new FormControl(),
    "Current M&E note": new FormControl(),
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
    "Rating": new FormControl('0'),
    "s&p": new FormControl(''),
    "fitch": new FormControl(''),
    "Moody’s": new FormControl(''),
    "AMBEST": new FormControl(''),
    'createdBy': new FormControl(),
    'createdOn': new FormControl(new Date()),
    'lastUpdateBy': new FormControl(),
    'lastUpdateOn': new FormControl(),
    'csvVersion': new FormControl(),
    'ProcessStatus': new FormControl(),
    'AssignTo': new FormControl(),
    'caseId': new FormControl(),
    'State': new FormControl(),
    'state of issue': new FormControl(),
    'PO': new FormControl(),
    'patientId': new FormControl(),
    'Policy type': new FormControl(),
    "Lapse": new FormControl(),
    "patientID": new FormControl(),
  })
  if (this.serviceData.patientData) {
    this.setCase(false)
  }
}

editForm(data: any) {
  console.log(data);
  
  this.caseForm.controls["Number"].setValue(data["Number"])
  this.caseForm.controls["Case"].setValue(data["Case"])
  this.caseForm.controls["Carrier"].setValue(data["Carrier"])
  this.caseForm.controls['group'].setValue(data['group'])
  this.caseForm.controls["Policy Form"].setValue(data["Policy Form"])
  this.caseForm.controls["Face amount"].setValue(data["Face amount"])
  this.caseForm.controls["Net Face amount"].setValue(data["Net Face amount"])
  this.caseForm.controls["Contact name"].setValue(data["Contact name"])
  this.caseForm.controls["Priority"].setValue(data["Priority"])
  this.caseForm.controls["Lives insured"].setValue(data["Lives insured"])
  this.caseForm.controls["NAV"].setValue(data["NAV"])
  this.caseForm.controls["State"].setValue(data["State"])
  this.caseForm.controls["state of issue"].setValue(data["state of issue"])
  this.caseForm.controls["PO"].setValue(data["PO"])
  this.caseForm.controls["IRR Gross"].setValue(data["IRR Gross"])
  this.caseForm.controls["IRR Net"].setValue(data["IRR Net"])
  this.caseForm.controls["Closing price"].setValue(data["Closing price"])
  this.caseForm.controls["Premium until age"].setValue(data["Premium until age"])
  this.caseForm.controls["Market"].setValue(data["Market"])
  this.caseForm.controls["Date of issue"].setValue(data["Date of issue"] ? data["Date of issue"].split('T')[0] : null)
  this.caseForm.controls["ILL date"].setValue(data["ILL date"] ? data["ILL date"].split('T')[0] : null)
  this.caseForm.controls["PLR"].setValue(data["PLR"])
  this.caseForm.controls["DB factor"].setValue(data["DB factor"])
  this.caseForm.controls["DB"].setValue(data["DB"])
  this.caseForm.controls["G. int"].setValue(data["G. int"])
  this.caseForm.controls["Ng. int"].setValue(data["Ng. int"])
  this.caseForm.controls["Admin"].setValue(data["Admin"])
  this.caseForm.controls["face/1000"].setValue(data["face/1000"])
  this.caseForm.controls["Other"].setValue(data["Other"])
  this.caseForm.controls["Coverage"].setValue(data["Coverage"])
  this.caseForm.controls["Current M&E"].setValue(data["Current M&E"])
  this.caseForm.controls["G. M&E"].setValue(data["G. M&E"])
  this.caseForm.controls["Persistency Bonus"].setValue(data["Persistency Bonus"])
  this.caseForm.controls["PLR note"].setValue(data["PLR note"])
  this.caseForm.controls["DB factor note"].setValue(data["DB factor note"])
  this.caseForm.controls["DB note"].setValue(data["DB note"])
  this.caseForm.controls["G. int note"].setValue(data["G. int note"])
  this.caseForm.controls["Ng. int note"].setValue(data["Ng. int note"])
  this.caseForm.controls["Admin note"].setValue(data["Admin note"])
  this.caseForm.controls["face/1000 note"].setValue(data["face/1000 note"])
  this.caseForm.controls["Other note"].setValue(data["Other note"])
  this.caseForm.controls["Coverage note"].setValue(data["Coverage note"])
  this.caseForm.controls["G. M&E note"].setValue(data["G. M&E note"])
  this.caseForm.controls["Current M&E note"].setValue(data["Current M&E note"])
  this.caseForm.controls["Persistency Bonus note"].setValue(data["Persistency Bonus note"])
  this.caseForm.controls["Age calculation"].setValue(data["Age calculation"])
  this.caseForm.controls["Value date"].setValue(data["Value date"] ? data["Value date"].split('T')[0] : null)
  this.caseForm.controls["Account value"].setValue(data["Account value"])
  this.caseForm.controls["Surrender value"].setValue(data["Surrender value"])
  this.caseForm.controls["Loan balance"].setValue(data["Loan balance"])
  this.caseForm.controls["Phone"].setValue(data["Phone"])
  this.caseForm.controls["Email"].setValue(data["Email"])
  this.caseForm.controls["STOLI/ fraud risk"].setValue(data["STOLI/ fraud risk"])
  this.caseForm.controls["Policy number"].setValue(data["Policy number"])
  this.caseForm.controls["Broker"].setValue(data["Broker"])
  this.caseForm.controls["Rating"].setValue(data["Rating"])
  this.caseForm.controls["s&p"].setValue(data["s&p"])
  this.caseForm.controls["fitch"].setValue(data["fitch"])
  this.caseForm.controls["Moody’s"].setValue(data["Moody’s"])
  this.caseForm.controls["AMBEST"].setValue(data["AMBEST"])
  this.caseForm.controls['createdBy'].setValue(data["createdBy"])
  this.caseForm.controls['createdOn'].setValue(data["createdOn"])
  this.caseForm.controls['lastUpdateBy'].setValue(data["lastUpdateBy"])
  this.caseForm.controls['lastUpdateOn'].setValue(data["lastUpdateOn"])
  this.caseForm.controls['csvVersion'].setValue(data["csvVersion"])
  this.caseForm.controls['ProcessStatus'].setValue(data["ProcessStatus"])
  this.caseForm.controls['AssignTo'].setValue(data["AssignTo"])
  this.caseForm.controls['source'].setValue(data['source'])
  this.caseForm.controls['Policy type'].setValue(data["Policy type"])
  this.caseForm.controls['Lapse'].setValue(data['Lapse'])
  this.caseForm.controls['patientID'].setValue(data['patientID'])
}

initCarrierForm(){
  this.carrierForm = new FormGroup({
    
  })
}

setCase(newCase: boolean) {
  let data = this.serviceData.patientData
  let Case = newCase ? `${data['Case']} - B` : data['Case']
  this.caseForm.get('Case').setValue(Case)
  this.caseForm.get('Number').setValue(data['Number'])
  this.caseForm.get('source').setValue(data['source'])
  this.caseForm.get('group').setValue(data['group'])

}

formatCurrency(inputElement: HTMLInputElement) {
  const value = inputElement.value.replace(/,/g, '');
  const formattedValue = Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
  inputElement.value = formattedValue;
}

formatPercentage(inputElement: HTMLInputElement) {
  const value = Number(inputElement.value.replace(/%/g, '').replace(/,/g, ''));
  if (!isNaN(value)) {
    const formattedValue = this.percentPipe.transform(value / 100, '1.2-2');
    inputElement.value = formattedValue || '';
  }
}

getCarriersNames() {
  this.service.getWithToken('carrier/getAllCarrierNames').subscribe((data: any[]) => {
    this.carriers = data
  })
}

onChooseCarrier(event: any) {
  console.log(event);
  let idx = this.carriers.findIndex(element => element.Carrier === event)
  let id = this.carriers[idx].id
  this.service.getWithToken(`carrier/getCarrierData/${id}`).subscribe((data: any) => {
    this.caseForm.controls["Rating"].setValue(data["Rating"].toString())
    this.caseForm.controls["s&p"].setValue(data["S&P"])
    this.caseForm.controls["fitch"].setValue(data["Fitch"])
    this.caseForm.controls["Moody’s"].setValue(data["Moodys"])
    this.caseForm.controls["AMBEST"].setValue(data["AMBEST"])
  })
  console.log(this.caseForm.value);

}

saveCase() {
  this.caseForm.get('Lives insured').setValue('Single')
  let body = {
    data: this.caseForm.value,
    patientData: this.serviceData.patientData
  }
  body['data']['mondayId'] = this.serviceData.patientData['mondayID']
  this.service.postWithToken('underwriting/saveCase', body).subscribe(res => {
    this.serviceData.caseData = res['sql']
    console.log(this.serviceData.caseData);
    this.action.emit('init')
  })
}

updateCase(move: boolean) {
  this.caseForm.get('Lives insured').setValue('Single')
  let id = this.serviceData.caseData.id
  // let faceAmount = this.caseForm.get('Face amount').value ? this.caseForm.get('Face amount').setValue(Number(this.caseForm.get('Face amount').value.replace(/,/g, ''))) : 0
  // let loanBalance = this.caseForm.get('Loan balance').value ? this.caseForm.get('Loan balance').setValue(this.caseForm.get('Loan balance').value.replace(/,/g, '')) : 0

  let data = this.caseForm.value
  console.log(data);
  
  data['mondayId'] = this.serviceData.caseData['mondayId'] ? this.serviceData.caseData['mondayId'] : this.serviceData.patientData['mondayId']
  data['patientID'] = this.serviceData.caseData['patientID'] ? this.serviceData.caseData['patientID'] : this.serviceData.patientData['id']

  this.service.postWithToken(`underwriting/updateCaseData/${id}/${false}`, data).subscribe(data => {
    this.action.emit('init')
  })
}

calcNetFace() {
  console.log(this.caseForm.value);
  let faceAmountType = this.caseForm.get('Face amount').value ? typeof (this.caseForm.get('Face amount').value) : null
  let faceAmount = this.caseForm.get('Face amount').value ?  this.caseForm.get('Face amount').value : 0
  let loanBalance = this.caseForm.get('Loan balance').value ? Number(this.caseForm.get('Loan balance').value) : 0
  if (faceAmount > 0) {
    this.caseForm.get('Net Face amount').setValue(faceAmount)
  }
  if (faceAmount > 0 && loanBalance > 0) {
    this.caseForm.get('Net Face amount').setValue(faceAmount - loanBalance)
  }

}


onFileChange(ev) {
  let workBook = null;
  let jsonData = null;
  const reader = new FileReader();
  const file = ev.target.files[0];
  reader.onload = (event) => {
    const data = reader.result;
    workBook = XLSX.read(data, { type: 'binary' });
    jsonData = workBook.SheetNames.reduce((initial, name) => {
      const sheet = workBook.Sheets[name];
      initial[name] = XLSX.utils.sheet_to_json(sheet);
      return initial;
    }, {});
    this.service.postWithToken('carrier/importMany', jsonData['Sheet1']).subscribe(data => {
      alert(data['msg'])
    })
  }
  reader.readAsBinaryString(file);
}
}
