import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AddImpaiementComponent } from './add-impaiement/add-impaiement.component';
// import { ExportPDFComponent } from './export-pdf/export-pdf.component';
// import { FullReportPdfComponent } from './full-report-pdf/full-report-pdf.component';
// import { NewPatientComponent } from './new-patient/new-patient.component';
import { UnderwritingComponent } from './underwriting.component';


const routes: Routes = [
  {
    path: '', 
    component: UnderwritingComponent,
    children: [
      // { path: 'newPatient', component: NewPatientComponent },
      // { path: 'newImpaiement', component: AddImpaiementComponent},
      // { path: 'exportPdf', component: ExportPDFComponent},
      // { path: 'fullRepo', component: FullReportPdfComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnderwritingRoutingModule { }
