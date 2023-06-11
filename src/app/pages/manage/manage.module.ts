import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbStepperModule , NbSpinnerModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ManageComponent } from './manage.component';
import { ThemeModule } from '../../@theme/theme.module';
import { ManageRoutingModule, routedComponents } from './manage-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { TablesComponent } from './tables/tables.component';
import { NbTabsetModule, NbUserModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material';
import {PinchZoomModule} from 'ngx-pinch-zoom';





import {
  NbActionsModule,
  NbButtonModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbRadioModule,
  NbSelectModule,
  NbAccordionModule,



} from '@nebular/theme';
import { UserlistComponent } from './userlist/userlist.component';
import { CreateHolderComponent } from './create-holder/create-holder.component';
import { HoldersComponent } from './holders/holders.component';
import { PolicyHolderComponent } from './policy-holder/policy-holder.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { InvestmentOpportunitiesComponent } from './investment-opportunities/investment-opportunities.component';
import { MaterialModuleHelper } from './upload-file/material-module';
import { ShowFormComponent } from './investment-opportunities/show-form.component';
import { PolicyFormComponent } from './policy-form/policy-form.component';
import { InvestmentDetailsComponent } from './investment-details/investment-details.component';
import { LegalDocsComponent } from './legal-docs/legal-docs.component';
import { KycComponent } from './kyc/kyc.component';
import { EmbedIdComponent } from './embed-id/embed-id.component';
import { SupportComponent } from './support/support.component';
import { PendingNAlertsComponent } from './pending-n-alerts/pending-n-alerts.component';
import { HoldingsInvestmentScheduleComponent } from './holdings-investment-schedule/holdings-investment-schedule.component';
import { SimulationComponent } from './simulation/simulation.component';
import { KycamlTestComponent } from './kycaml-test/kycaml-test.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  imports: [
    NbButtonModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    ManageRoutingModule,
    NbTabsetModule,
    FormsModule,
    NbAccordionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MaterialModuleHelper,
    NbSelectModule,
    NbStepperModule,
    NbCheckboxModule,
    NbSpinnerModule,
    PinchZoomModule,
  ],
  entryComponents: [ShowFormComponent,
  ],
  declarations: [
    routedComponents,
    CreateUserComponent,
    TablesComponent,
    UserlistComponent,
    CreateHolderComponent,
    HoldersComponent,
    PolicyHolderComponent,
    UploadFileComponent,
    InvestmentOpportunitiesComponent,
    ShowFormComponent,
    PolicyFormComponent,
    InvestmentDetailsComponent,
    LegalDocsComponent,
    KycComponent,
    EmbedIdComponent,
    SupportComponent,
    PendingNAlertsComponent,
    HoldingsInvestmentScheduleComponent,
    SimulationComponent,
    KycamlTestComponent,
    FooterComponent,
  ],
})
export class ManageModule { }
