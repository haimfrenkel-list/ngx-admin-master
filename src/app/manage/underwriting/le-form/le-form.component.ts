import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ServerTokenService } from '../../../services/server-token.service';
import { UnderwritingDataService } from '../underwriting-data.service';

@Component({
  selector: 'ngx-le-form',
  templateUrl: './le-form.component.html',
  styleUrls: ['./le-form.component.scss']
})
export class LeFormComponent implements OnInit {

  @Output() action = new EventEmitter<string>();
  providers: string[] = ["ISC", "LSI", "AVS", "fasano", "21ST", "predictive", "BIMO", "lapetus", "convergence", "clarity", "polaris", "EMSI", "elevation", "midwest", "amscot"]
  leForm: FormGroup
  updateMode: string = 'Create'

  constructor(private service: ServerTokenService, private serviceData: UnderwritingDataService) { }

  ngOnInit() {
    this.initForm()
    console.log(this.serviceData.caseData);
    console.log(this.serviceData.patientData)
    
    if (this.serviceData.LEdata) {
      this.editForm(this.serviceData.LEdata)
      this.updateMode = 'Update'
    }
    console.log(this.leForm.controls.LEproviders['controls']);
    
  }

  initForm() {
    this.leForm = new FormGroup({
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
          'patientID': new FormControl(this.serviceData.patientData ? this.serviceData.patientData.id : null),
          'caseID': new FormControl(this.serviceData.caseData ? this.serviceData.caseData.id : null),
        })
      ])
    })
  }

  editForm(data: any) {
    data.forEach((value, index) => {
      if (!this.LEproviders.at(index)) {
        this.addLEproviders()
      }
      if (value["LE provider"]) {
        this.LEproviders.at(index).setValue(value)
        this.LEproviders.at(index).get('LE date').setValue(value['LE date'] ? value['LE date'].split('T')[0] : null)
      }
    });

  }

  get LEproviders() {
    return this.leForm.controls["LEproviders"] as FormArray
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
      'patientID': new FormControl(this.serviceData.patientData ? this.serviceData.patientData.id : null),
      'caseID': new FormControl(this.serviceData.caseData ? this.serviceData.caseData.id : null),
    });
    this.LEproviders.push(LEprovidersform);
  }

  saveLE() {
    let body = {
      data: this.leForm.value,
      source: this.serviceData.caseData['source'],
      Case: this.serviceData.caseData['Case'],
      mondayId: this.serviceData.patientData['mondayId']
    }
    this.service.postWithToken('underwriting/saveLE', body).subscribe(res => {
      console.log(res);
      this.action.emit('case')
    })
  }

  removePro(i: any){
    this.LEproviders.removeAt(i)
  }

  updateLE(finish: boolean){
    if(!this.serviceData.caseData || !this.serviceData.patientData){
      alert('le providers cannot be updated without case and patient information')
      return
    }
    let caseID = this.serviceData.caseData.id
    let patientID = this.serviceData.patientData.id
    let body = {
      data: this.leForm.value,
      source: this.serviceData.patientData['source'],
      mondayId: this.serviceData.patientData['mondayId'],
      Case: this.serviceData.caseData.Case
    }
    
    this.service.postWithToken(`underwriting/updateLEData/${patientID}/${caseID}`, body).subscribe(data => {
      if (finish) {
        this.serviceData.patientData = null
        this.serviceData.caseData = null
        this.serviceData.LEdata = null
        this.initForm()
       this.action.emit('init')
      } else {
        this.action.emit('init')
      }
    })
  }

}
