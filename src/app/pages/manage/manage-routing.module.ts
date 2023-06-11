import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './manage.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { HoldersComponent } from './holders/holders.component';
import { CreateHolderComponent } from './create-holder/create-holder.component';
import { PolicyHolderComponent } from './policy-holder/policy-holder.component';
import { patch } from '../../../../node_modules/@nebular/theme';
import { InvestmentOpportunitiesComponent } from './investment-opportunities/investment-opportunities.component';
import { ShowFormComponent } from './investment-opportunities/show-form.component';
import { PolicyFormComponent } from './policy-form/policy-form.component';
import { Path } from '../../../../node_modules/@types/leaflet';
import { LegalDocsComponent } from './legal-docs/legal-docs.component';
import { KycComponent } from './kyc/kyc.component';
import { EmbedIdComponent } from './embed-id/embed-id.component';
import { SupportComponent} from './support/support.component';
import { PendingNAlertsComponent } from './pending-n-alerts/pending-n-alerts.component';
import { HoldingsInvestmentScheduleComponent } from './holdings-investment-schedule/holdings-investment-schedule.component';
import { SimulationComponent } from './simulation/simulation.component';
const routes: Routes = [{
  path: '',
  component: ManageComponent,
  children: [

    {
      path: 'create-holder',
      component: CreateHolderComponent,
    },
    {
      path: 'holders',
      component: HoldersComponent,
    },
    {
      path: 'policy-holder',
      component: PolicyHolderComponent,
    },
    {
      path: 'upload',
      component: UploadFileComponent,
    },
    {
      path: 'investment-opportunities',
      component: InvestmentOpportunitiesComponent,
    },
    {
      path: 'pending-n-alerts',
      component: PendingNAlertsComponent,
    },
    {
      path: 'holdings-investment-schedule',
      component: HoldingsInvestmentScheduleComponent,
    },
    {
      path: 'legal-documents',
      component: LegalDocsComponent,
    },
    {
      path: 'simulation',
      component: SimulationComponent,
    },
    {
      path: 'kyc',
      component: KycComponent,
    },
    {
      path: 'support',
      component: SupportComponent,
    },
    {
      path: 'embedId',
      component: EmbedIdComponent,
    },
    {
      path: 'support',
      component: SupportComponent,
    },

    //     path: 'tree-grid',
    //     component: TreeGridComponent,
    //   },
  ],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageRoutingModule { }

export const routedComponents = [
  ManageComponent,
];
