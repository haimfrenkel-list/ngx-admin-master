import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, PercentPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnderwritingRoutingModule } from './underwriting-routing.module';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { UnderwritingComponent } from './underwriting.component';
import { AddImpaiementComponent } from './add-impaiement/add-impaiement.component';
import { NbActionsModule, NbButtonComponent, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule , NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbPopoverModule, NbRadioModule, NbSelectModule, NbStepperModule, NbTreeGridModule, NbUserModule, NbWindowModule, NbWindowService } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { ExportPDFComponent } from './export-pdf/export-pdf.component';
import { ChartsComponent } from './charts/charts.component';
import { FullReportPdfComponent } from './full-report-pdf/full-report-pdf.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomInputEditorComponent, EditUnderwritingComponent, NotesComponent } from './edit-underwriting/edit-underwriting.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MessagesComponent } from './messages/messages.component';
import { CaseMsgComponent } from './case-msg/case-msg.component';
import { ShowMsgComponent } from './show-msg/show-msg.component';
import { AddCaseComponent } from './add-case/add-case.component';
import { UnderDashboardComponent } from './under-dashboard/under-dashboard.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { CaseFormComponent } from './case-form/case-form.component';
import { LeFormComponent } from './le-form/le-form.component';


@NgModule({
  declarations: [
    NewPatientComponent,
    UnderwritingComponent,
    AddImpaiementComponent,
    ExportPDFComponent,
    ChartsComponent,
    FullReportPdfComponent,
    DashboardComponent,
    EditUnderwritingComponent,
    MessagesComponent,
    CaseMsgComponent,
    ShowMsgComponent,
    AddCaseComponent,
    UnderDashboardComponent,
    PatientFormComponent,   
    CaseFormComponent,
    LeFormComponent,
    CustomInputEditorComponent,
    NotesComponent

   
  ],
  imports: [
    CommonModule,
    UnderwritingRoutingModule,
    ReactiveFormsModule,
    NbMenuModule,
    FormsModule,
    NbStepperModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,   
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbPopoverModule,
    NbDialogModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    // NbWindowModule.forChild(),
    
    Ng2SmartTableModule,
    
    
    
  ],
  entryComponents: [
    CustomInputEditorComponent,
    CaseMsgComponent,
    NbButtonComponent,
    NotesComponent
  ],
  providers:[
    DecimalPipe,
     PercentPipe
   ],
   exports: [
    // ChartsComponent
   ]
})
export class UnderwritingModule { }
