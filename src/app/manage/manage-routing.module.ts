import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AdminGuard } from '../auth/auth-guard.service';
import { GeneralInformationComponent } from './general-information/general-information.component';
import { ImpiaementsComponent } from './impiaements/impiaements.component';
import { LabsComponent } from './labs/labs.component';
import { LifeExpectancyComponent } from './life-expectancy/life-expectancy.component';
import { LifeStyleComponent } from './life-style/life-style.component';
import { ManageUnderComponent } from './manage-under/manage-under.component';
import { ManageComponent } from './manage.component';
import { MedicationsComponent } from './medications/medications.component';
import { OcrComponent } from './ocr/ocr.component';
import { RegisterComponent } from './register/register.component';
import { TroubleshootingComponent } from './troubleshooting/troubleshooting.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';

const routes: Routes = [
  {
    path: '',
    component: ManageComponent,
    children: [
      {
        path: 'upload',
        component: UploadFilesComponent,
      },
      {
        path: 'ocr',
        component: OcrComponent,
      },
      {
        path: 'impairements',
        component: ImpiaementsComponent,
      },
      {
        path: 'add',
        component: RegisterComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'general-info',
        component: GeneralInformationComponent,
      },
      {
        path: 'medication',
        component: MedicationsComponent,
      },
      {
        path: 'labs',
        component: LabsComponent,
      },
      {
        path: 'lifestyle',
        component: LifeStyleComponent,
      },
      {
        path: 'le',
        component: LifeExpectancyComponent,
      },
      {
        path: 'troubleshooting',
        component: TroubleshootingComponent,
      },
      {
        path: 'manageUnder',
        component: ManageUnderComponent,
        canActivate: [AdminGuard]
      },
      
    ],



  },
  {
    path: 'underwriting',
    loadChildren: () => import('./underwriting/underwriting.module')
      .then(m => m.UnderwritingModule), canLoad: [AuthGuard]
  },

];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageRoutingModule { }
