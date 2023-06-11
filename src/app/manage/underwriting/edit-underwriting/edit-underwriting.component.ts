import { Component, OnInit, Output, EventEmitter, Pipe, Input, ViewChild, TemplateRef } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DefaultEditor, LocalDataSource } from 'ng2-smart-table';
import { fromEvent } from 'rxjs';
import { HighlightSpanKind } from 'typescript';
import { ServerTokenService } from '../../../services/server-token.service';
import { UnderwritingDataService } from '../underwriting-data.service';
import { group } from 'console';
import { MessagesComponent } from '../messages/messages.component';
import { NbButtonComponent, NbWindowService, NbIconModule } from '@nebular/theme';
import { CaseMsgComponent } from '../case-msg/case-msg.component';

@Component({
  selector: 'ngx-edit-underwriting',
  templateUrl: './edit-underwriting.component.html',
  styleUrls: ['./edit-underwriting.component.scss']
})
export class EditUnderwritingComponent implements OnInit {
  @Output() action = new EventEmitter<string>();
  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;


  source: LocalDataSource
  tabelData = []
  underwritings
  currentNumber
  form
  csvVersion
  groupOption: string[]
  statusOption
  usersOption
  showMessages: boolean = false
  constructor(private service: ServerTokenService, private serviceData: UnderwritingDataService, private windowService: NbWindowService) { }

  ngOnInit() {
    this.tabelData = []
    this.serviceData.caseData = null
    this.serviceData.patientData = null
    this.serviceData.LEdata = null
    this.serviceData.newCaseExsistingPatient = false
    this.statusOption = this.serviceData.statusMode
    this.usersOption = this.serviceData.userNames
    if (this.serviceData.csvVersion || !this.csvVersion) {
      this.serviceData.getLastVersion()
      this.csvVersion = this.serviceData.csvVersion
    }
    this.getGroupsTitle()

    this.setBackButton()
  }

  getGroupsTitle() {
    this.service.getWithToken('underwriting/getTitles').subscribe(data => {
      this.groupOption = data['titles']
      this.getUnderwritings()
    })
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
   

  openWindowForm(data) {
    this.windowService.open(CaseMsgComponent, { title: `Window`, context: data, windowClass: 'custom-window-class', });

  }





  getUnderwritings() {
    this.service.getWithToken('underwriting/getCases').subscribe((pol: any[]) => {

      this.service.getWithToken('underwriting/getUnd').subscribe((und: any[]) => {
        this.mergeData(und, pol['data'])
      })
    })
  }

  mergeData(underwritings: any[], policies: any[]) {
    policies.forEach((element: any) => {
      let find = false
      for (let i = 0; i < underwritings.length || find; i++) {
        if (element['Case'] === underwritings[i]['Case']) {
          element['ProcessStatus'] = underwritings[i]['ProcessStatus']
          element['AssignTo'] = underwritings[i]['AssignTo']
        }
      }
    });
    this.splitForTabels(policies)
  }

  splitForTabels(data: any[]) {
    let ForGonenReviewForPricingPurposes = []
    let tests = []
    let Abacus = []
    let Apex = []
    let Aryeh = []
    let Berkshire = []
    let ClosingProcess = []
    let FollowUpForMoreIllDetails = []
    let Hold = []
    let HoldInsufficentMeds = []
    let HoldLongLE = []
    let HoldNoValue = []
    let HoldTooExpensive = []
    let KangoGroup = []
    let LifeRoc = []
    let Lost = []
    let LostBids = []
    let Maple = []
    let Maturities = []
    let MSPG = []
    let NewDeals = []
    let NeedToBid = []
    let NewGroup = []
    let PendingInactiveOffers = []
    let PendingOffers = []
    let PostInitialAnalysis = []
    let QCapital = []
    let Serviced = []
    let SGI = []
    let TailRisk = []
    let Vida = []
    let Won = []
    this.tabelData = []

    data.forEach(element => {
      if (element['group']) {
        switch (element['group']) {
          case `For Gonen's review for pricing purposes`:
            ForGonenReviewForPricingPurposes.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Abacus':
            Abacus.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'tests':
            tests.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Apex':
            Apex.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Aryeh':
            Aryeh.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Berkshire':
            Berkshire.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Closing process':
            ClosingProcess.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Follow up for more ill details':
            FollowUpForMoreIllDetails.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Hold':
            Hold.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Hold-insufficent meds/LE':
            HoldInsufficentMeds.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Hold-Long LE':
            HoldLongLE.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Hold-No value':
            HoldNoValue.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Hold-too expensive':
            HoldTooExpensive.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Kango Group':
            KangoGroup.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'LifeRoc':
            LifeRoc.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Lost':
            Lost.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Lost Bids':
            LostBids.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Maple':
            Maple.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Maturities':
            Maturities.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'MSPG':
            MSPG.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Need to Bid':
            NeedToBid.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'New Deals':
            NewDeals.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'New Group':
            NewGroup.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Pending inactive offers':
            PendingInactiveOffers.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Pending offers':
            PendingOffers.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Post Initial Analysis':
            PostInitialAnalysis.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'QCapital':
            QCapital.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Serviced':
            Serviced.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'SGI':
            SGI.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Tail Risk':
            TailRisk.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Vida':
            Vida.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          case 'Won':
            Won.push({
              "id": element['id'],
              "patientId": element['patientID'],
              "mondayId": element['mondayId'],
              "FirstName": element['FirstName'],
              "LastName": element['LastName'],
              "Face amount": element['Face amount'],
              "Gender": element['patient']['Gender'],
              "Age": element['patient']['DOB'] ? new Date(element['patient']['DOB']).getAge() : null,
              "Policy type": element['Policy type'],
              "Lives insured": element['Lives insured'],
              "group": element['group'],
              "ProcessStatus": element['ProcessStatus'],
              "AssignTo": element['AssignTo'],
              "Case": element['Case'],
              "notes": 'notes'
            })
            break;
          default:

            break;
        }
      }
    })
    if (ForGonenReviewForPricingPurposes.length > 0) { this.tabelData.push({ title: `For Gonen's review for pricing purposes`, source: new LocalDataSource(ForGonenReviewForPricingPurposes) }) }
    if (Abacus.length > 0) { this.tabelData.push({ title: 'Abacus', source: new LocalDataSource(Abacus) }) }
    if (tests.length > 0) { this.tabelData.push({ title: 'tests', source: new LocalDataSource(tests) }) }
    if (Apex.length > 0) { this.tabelData.push({ title: 'Apex', source: new LocalDataSource(Apex) }) }
    if (Aryeh.length > 0) { this.tabelData.push({ title: 'Aryeh', source: new LocalDataSource(Aryeh) }) }
    if (Berkshire.length > 0) { this.tabelData.push({ title: 'Berkshire', source: new LocalDataSource(Berkshire) }) }
    if (ClosingProcess.length > 0) { this.tabelData.push({ title: 'Closing Process', source: new LocalDataSource(ClosingProcess) }) }
    if (FollowUpForMoreIllDetails.length > 0) { this.tabelData.push({ title: 'Follow up for more ill details', source: new LocalDataSource(FollowUpForMoreIllDetails) }) }
    if (Hold.length > 0) { this.tabelData.push({ title: 'Hold', source: new LocalDataSource(Hold) }) }
    if (HoldInsufficentMeds.length > 0) { this.tabelData.push({ title: 'Hold-insufficent meds/LE', source: new LocalDataSource(HoldInsufficentMeds) }) }
    if (HoldLongLE.length > 0) { this.tabelData.push({ title: 'Hold-Long LE', source: new LocalDataSource(HoldLongLE) }) }
    if (HoldNoValue.length > 0) { this.tabelData.push({ title: 'Hold-No value', source: new LocalDataSource(HoldTooExpensive) }) }
    if (HoldTooExpensive.length > 0) { this.tabelData.push({ title: 'Hold-too expensive', source: new LocalDataSource(HoldTooExpensive) }) }
    if (KangoGroup.length > 0) { this.tabelData.push({ title: 'Kango Group', source: new LocalDataSource(KangoGroup) }) }
    if (LifeRoc.length > 0) { this.tabelData.push({ title: 'LifeRoc', source: new LocalDataSource(LifeRoc) }) }
    if (Lost.length > 0) { this.tabelData.push({ title: 'Lost', source: new LocalDataSource(Lost) }) }
    if (LostBids.length > 0) { this.tabelData.push({ title: 'Lost Bids', source: new LocalDataSource(LostBids) }) }
    if (Maple.length > 0) { this.tabelData.push({ title: 'Maple', source: new LocalDataSource(Maple) }) }
    if (Maturities.length > 0) { this.tabelData.push({ title: 'Maturities', source: new LocalDataSource(Maturities) }) }
    if (MSPG.length > 0) { this.tabelData.push({ title: 'MSPG', source: new LocalDataSource(MSPG) }) }
    if (NewDeals.length > 0) { this.tabelData.push({ title: 'New Deals', source: new LocalDataSource(NewDeals) }) }
    if (NeedToBid.length > 0) { this.tabelData.push({ title: 'Need To Bid', source: new LocalDataSource(NeedToBid) }) }
    if (NewGroup.length > 0) { this.tabelData.push({ title: 'New Group', source: new LocalDataSource(NewGroup) }) }
    if (PendingInactiveOffers.length > 0) { this.tabelData.push({ title: 'Pending Inactive Offers', source: new LocalDataSource(PendingInactiveOffers) }) }
    if (PendingOffers.length > 0) { this.tabelData.push({ title: 'Pending Offers', source: new LocalDataSource(PendingOffers) }) }
    if (PostInitialAnalysis.length > 0) { this.tabelData.push({ title: 'Post Initial Analysis', source: new LocalDataSource(PostInitialAnalysis) }) }
    if (QCapital.length > 0) { this.tabelData.push({ title: 'QCapital', source: new LocalDataSource(QCapital) }) }
    if (Serviced.length > 0) { this.tabelData.push({ title: 'Serviced', source: new LocalDataSource(Serviced) }) }
    if (SGI.length > 0) { this.tabelData.push({ title: 'SGI', source: new LocalDataSource(SGI) }) }
    if (TailRisk.length > 0) { this.tabelData.push({ title: 'TailRisk', source: new LocalDataSource(TailRisk) }) }
    if (Vida.length > 0) { this.tabelData.push({ title: 'Vida', source: new LocalDataSource(Vida) }) }
    if (Won.length > 0) { this.tabelData.push({ title: 'Won', source: new LocalDataSource(Won) }) }

  }

  onUserRowSelect(event): void {
    const data = event.data;
    this.showMessages = true
  }

  showMedssages() {

  }

  deletePolicy(event: any) {
    let Case = event.data.Case
    let id = event.data.id
    let mondayId = event.data.mondayId
    if (window.confirm(`Are you sure you want to delete ${Case}`)) {
      this.service.deleteWithToken(`underwriting/deletePolicy/${id}/${Case}/${mondayId}`).subscribe(res => {
        if (res['data'].deletedCount === 0) {
          alert('something worng')
          return
        }
        this.getUnderwritings()
      })
    }
  }

  getMoreData(event: any) {
    let patientId = event['data']['patientId']
    let caseId = event['data']['id']

    this.service.getWithToken(`underwriting/moreData/${patientId}/${caseId}`).subscribe(data => {
      if (data['dob']) {
        data['dob'] = new Date(data['dob']).getAge()
      }
      alert(JSON.stringify(data))
    })
  }

  getData(event) {
    let id = event.data.id
    let caseId = event.data.CaseId
    this.serviceData.getCaseData(id, caseId).subscribe(data => {
      this.action.emit('editCase')
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

    actions: {
      // custom: [
      //   { name: 'viewrecord', title: '<i class="fa fa-eye"></i>' },
      // ],
    },
    columns: {
      group: {
        title: "Group",
        type: 'custom',
        editable: false,
        filter: false,
        addable: true,
        renderComponent: CustomInputEditorComponent,
        valuePrepareFunction: (cell, row) => {
          return { data: this.groupOption, value: cell, title: "group" };
        },
        onComponentInitFunction: (instance) => {
          instance.groups = true
          instance.changeGroup.subscribe((data) => {
            if (data === 'success') {
              this.ngOnInit()
            }
          });
        }
      },
      Case: {
        title: 'Case',
        type: 'stirng',
      },
      notes: {
        title: 'Your Column Name',
        type: 'custom',
        renderComponent: NotesComponent,
        valuePrepareFunction: (cell, row) => {
          return row;
        },
        onComponentInitFunction: (instance)=> {
          instance.click.subscribe((data) => {
            this.openWindowForm(data)

          })
        },
      },
      FirstName: {
        title: 'First Name',
        type: 'stirng',

      },
      LastName: {
        title: 'Last Name',
        type: 'string',
      },
      "Face amount": {
        title: 'Face Amount',
        type: 'string',
      },
      "Policy type": {
        title: 'Policy Type',
        type: 'string',
      },
      "Lives insured": {
        title: 'Lives insured',
        type: 'string',
      },
      "Gender": {
        title: 'Gender',
        type: 'string',
      },
      "Age": {
        title: 'Age',
        type: 'string',
      },
      "ProcessStatus": {
        title: 'Underwriting Status',
        type: 'custom',
        editable: false,
        filter: false,
        addable: true,
        renderComponent: CustomInputEditorComponent,
        valuePrepareFunction: (cell, row) => {
          return { data: this.statusOption, value: cell, title: "status" };
        },
        onComponentInitFunction: (instance) => {
          instance.proccess = true
        }
      },
      "AssignTo": {
        title: 'User',
        type: 'custom',
        editable: false,
        filter: false,
        addable: true,
        renderComponent: CustomInputEditorComponent,
        valuePrepareFunction: (cell, row) => {
          return { data: this.usersOption, value: cell, title: "users" };
        },
        onComponentInitFunction: (instance) => {
          instance.user = true
        }
      }
    },
  };
}


@Component({
  selector: 'input-editor',
  template: `
    <select [(ngModel)]="currentValue" (change)="saveChanges()"><option *ngFor="let item of periodOptions" [value]="item">{{item}}</option></select>
    `,
})
export class CustomInputEditorComponent implements OnInit {
  currentValue: string
  periodOptions = []
  groups: boolean = false
  proccess: boolean = false
  user: boolean = false
  constructor(private service: ServerTokenService, private serviceData: UnderwritingDataService) {
  }
  ngOnInit(): void {
    this.currentValue = this.value.value
    this.periodOptions = this.value.data

    // alert(JSON.stringify(this.rowData));
    // alert(this.value);
  }
  @Input() value: string | number | any;
  @Input() rowData: any;
  @Output() changeGroup = new EventEmitter();

  saveChanges() {
    let body = {}

    if (this.groups) {
      body = {
        patientID: this.rowData['patientId'],
        id: this.rowData['id'],
        group: this.currentValue,
        Case: this.rowData['Case']
      }
      this.service.postWithToken('underwriting/updateGroup', body).subscribe(data => {
        if (data['status'] === 'saved') {
          this.changeGroup.emit('success')
        }
      })
    } else {
      if (this.proccess) {
        body = {
          Case: this.rowData['Case'],
          ProcessStatus: this.currentValue,
        }
      } else if (this.user) {
        body = {
          Case: this.rowData['Case'],
          AssignTo: this.currentValue
        }
      }
      this.service.postWithToken('underwriting/updateStatus', body).subscribe()
    }
  }
}

@Component({
  selector: 'input-editor',
  template: `
    <button (click)="onClick()">Messages</button>
    `,
})
export class NotesComponent implements OnInit {
  @Input() rowData: any;
  @Output() click = new EventEmitter();

  constructor(private service: ServerTokenService, private serviceData: UnderwritingDataService) {
  }
  ngOnInit(): void {

  }

  onClick() {
    this.click.emit(this.rowData)
  }

}

