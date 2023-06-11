import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageRoutingModule } from './manage-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule, NbAccordionModule,
  NbRadioModule, NbIconModule, NbInputModule, NbProgressBarModule,
  NbTreeGridModule, NbStepperModule, NbSpinnerModule, NbLayoutModule, NbPopoverModule
} from '@nebular/theme';
import { NbMenuModule, NbTabsetModule, NbSelectModule, NbIconLibraries, NbButtonModule, NbContextMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpClientModule } from '@angular/common/http';
// import { InlineSVGModule } from 'ng-inline-svg';
// import { NgxFileDragDropModule } from 'ngx-file-drag-drop';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { OcrComponent } from './ocr/ocr.component';
import { ImpiaementsComponent } from './impiaements/impiaements.component';
import { GeneralInformationComponent } from './general-information/general-information.component';
import { MedicationsComponent } from './medications/medications.component';
import { LabsComponent } from './labs/labs.component';
import { LifeStyleComponent } from './life-style/life-style.component';
import { LifeExpectancyComponent } from './life-expectancy/life-expectancy.component';
import { TroubleshootingComponent } from './troubleshooting/troubleshooting.component';
import { RegisterComponent } from './register/register.component';
import { ManageUnderComponent } from './manage-under/manage-under.component';
// import { ChartsComponent } from './underwriting/charts/charts.component';
import { ManageComponent } from './manage.component';




@NgModule({
  declarations: [
    ManageComponent,
    UploadFilesComponent,
    OcrComponent,
    ImpiaementsComponent,
    GeneralInformationComponent,
    MedicationsComponent,
    LabsComponent,
    LifeStyleComponent,
    LifeExpectancyComponent,
    TroubleshootingComponent,
    RegisterComponent,
    ManageUnderComponent
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    ManageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbProgressBarModule,
    ThemeModule,
    NbPopoverModule,
    NbCardModule, NbAccordionModule, NbTabsetModule, NbSelectModule,
    NbButtonModule, NbIconModule, NbInputModule, NbTreeGridModule, NbStepperModule, NbSpinnerModule,
    NbMenuModule,
    NbLayoutModule,
    Ng2SmartTableModule,
    HttpClientModule,
    // InlineSVGModule.forRoot(),
    NbContextMenuModule,
    // NgxFileDragDropModule,
    NbRadioModule,
    // ChartsComponent


  ],
})
export class ManageModule {
  constructor(
    iconsLibrary: NbIconLibraries
  ) {
        iconsLibrary.registerSvgPack('ListIconPackage', {
          'investment-opportunities':

            '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32.84 32.84">'
            + '<g id="Investor_opportunity" data-name="Investor_opportunity" transform="translate(-211 -242)">'
            + '<g id="Group_256" data-name="Group 256" transform="translate(211 242)">'
            + '<g id="Group_255" data-name="Group 255" transform="translate(0)">'
            + '<path id="Path_320" data-name="Path 320" d="M260.424,255.47a.969.969,0,0,0-.97-.97h-3.879a.969.969,0,0,0-.97.97v13.576h5.818Zm8.242,1.939a.969.969,0,0,0-.97-.97h-3.879a.969.969,0,0,0-.97.97v11.636h5.818Zm3.879,14.061H243.455a1.455,1.455,0,1,0,0,2.909h29.091a1.455,1.455,0,0,0,0-2.909Zm-20.364-11.152a.969.969,0,0,0-.97-.97h-3.879a.969.969,0,0,0-.97.97v8.727h5.818Z" transform="translate(-242 -242.379)" fill="currentColor"/>'
            + '<path id="Path_321" data-name="Path 321" d="M270.179,242.009l-4.36.623a.861.861,0,0,0-.487,1.461l1.008,1.008-3.517,3.516-5.777-4.381a1.456,1.456,0,0,0-1.8.035l-9.212,7.571a1.455,1.455,0,1,0,1.846,2.249l8.325-6.843,5.873,4.454a1.453,1.453,0,0,0,1.906-.131l4.414-4.413.673.672a.861.861,0,0,0,1.46-.487l.623-4.36A.861.861,0,0,0,270.179,242.009Z" transform="translate(-242.106 -242)" fill="currentColor"/>'
            + '</g></g></g></svg>',

          'pending':
            '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32.84 32.84">'
            + '<g id="Pending" transform="translate(-108.288 -9.019)">'
            + '  <path id="Path_322" data-name="Path 322" d="M117.088,10.871a16.5,16.5,0,0,1,6.929-1.852v7.036a9.356,9.356,0,0,0-3.411.918Z" fill="currentColor" fill-rule="evenodd"/>'
            + '  <path id="Path_323" data-name="Path 323" d="M110.826,16.634a16.54,16.54,0,0,1,5.077-5.077l3.518,6.1a9.564,9.564,0,0,0-2.5,2.495Z" fill="currentColor" fill-rule="evenodd"/>'
            + '  <path id="Path_324" data-name="Path 324" d="M108.288,24.757a16.3,16.3,0,0,1,1.852-6.938l6.093,3.518a9.218,9.218,0,0,0-.909,3.42Z" fill="currentColor" fill-rule="evenodd"/>'
            + '  <path id="Path_325" data-name="Path 325" d="M110.14,33.059a16.227,16.227,0,0,1-1.852-6.93h7.036a9.177,9.177,0,0,0,.909,3.412Z" fill="currentColor" fill-rule="evenodd"/>'
            + '  <path id="Path_326" data-name="Path 326" d="M115.9,39.321a16.54,16.54,0,0,1-5.077-5.077l6.092-3.519a9.445,9.445,0,0,0,2.5,2.5Z" fill="currentColor" fill-rule="evenodd"/>'
            + '  <path id="Path_327" data-name="Path 327" d="M124.017,41.859a16.236,16.236,0,0,1-6.929-1.852l3.518-6.093a9.347,9.347,0,0,0,3.411.909Z" fill="currentColor" fill-rule="evenodd"/>'
            + '  <path id="Path_328" data-name="Path 328" d="M132.328,40.007a16.315,16.315,0,0,1-6.939,1.852V34.823a9.393,9.393,0,0,0,3.42-.909Z" fill="currentColor" fill-rule="evenodd"/>'
            + '  <path id="Path_329" data-name="Path 329" d="M138.589,34.244a16.638,16.638,0,0,1-5.077,5.077l-3.518-6.093a9.515,9.515,0,0,0,2.494-2.5Z" fill="currentColor" fill-rule="evenodd"/>'
            + '  <path id="Path_330" data-name="Path 330" d="M141.128,26.129a16.365,16.365,0,0,1-1.862,6.93l-6.092-3.518a9.36,9.36,0,0,0,.917-3.412Z" fill="currentColor" fill-rule="evenodd"/>'
            + '  <path id="Path_331" data-name="Path 331" d="M139.266,17.819a16.44,16.44,0,0,1,1.862,6.938h-7.037a9.4,9.4,0,0,0-.917-3.42Z" fill="currentColor" fill-rule="evenodd"/>'
            + '  <path id="Path_332" data-name="Path 332" d="M133.512,11.557a16.638,16.638,0,0,1,5.077,5.077l-6.1,3.519a9.5,9.5,0,0,0-2.494-2.495Z" fill="currentColor" fill-rule="evenodd"/>'
            + '</g>'
            + '</svg>',

          'holdings-investment-schedule':
            '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32.84 32.84">'
            + '<g id="holdings-investment-schedule" transform="translate(-810.599 -313.451)">'
            + '<path id="Path_334" data-name="Path 334" d="M848.245,333.554l-1.163-.222a8.065,8.065,0,0,0-.389-1.875l.981-.667a.685.685,0,0,0,.181-.949l-1.723-2.542a.681.681,0,0,0-.948-.181l-.98.668a8.059,8.059,0,0,0-1.595-1.052l.222-1.166a.683.683,0,0,0-.542-.8l-3.012-.576a.681.681,0,0,0-.511.106.689.689,0,0,0-.287.438l-.221,1.165a8,8,0,0,0-1.87.39l-.666-.983a.68.68,0,0,0-.947-.181l-2.536,1.728a.684.684,0,0,0-.181.949l.666.983a8.078,8.078,0,0,0-1.05,1.6l-1.162-.222a.68.68,0,0,0-.8.543l-.575,3.018a.684.684,0,0,0,.542.8l1.162.222a8.1,8.1,0,0,0,.389,1.874l-.98.668a.683.683,0,0,0-.181.949l1.722,2.542a.681.681,0,0,0,.948.181l.98-.668a8.015,8.015,0,0,0,1.6,1.052l-.222,1.166a.683.683,0,0,0,.541.8l3.012.576a.7.7,0,0,0,.128.012.683.683,0,0,0,.669-.555l.222-1.166a8.03,8.03,0,0,0,1.87-.389l.666.982a.681.681,0,0,0,.947.182l2.536-1.728a.684.684,0,0,0,.181-.949l-.666-.983a8.065,8.065,0,0,0,1.05-1.6l1.163.222a.682.682,0,0,0,.8-.543l.574-3.018a.683.683,0,0,0-.542-.8ZM847,336.444l-1.018-.195a.679.679,0,0,0-.757.408,6.724,6.724,0,0,1-1.378,2.1.684.684,0,0,0-.074.859l.584.861-1.408.959-.583-.861a.681.681,0,0,0-.823-.248,6.714,6.714,0,0,1-2.455.511.682.682,0,0,0-.657.555l-.194,1.021-1.672-.32.194-1.02a.684.684,0,0,0-.408-.76,6.7,6.7,0,0,1-2.094-1.381.681.681,0,0,0-.857-.073l-.858.584-.956-1.411.858-.585a.684.684,0,0,0,.248-.825,6.743,6.743,0,0,1-.51-2.461.683.683,0,0,0-.554-.659l-1.018-.195.319-1.676,1.018.195a.68.68,0,0,0,.757-.408,6.749,6.749,0,0,1,1.378-2.1.684.684,0,0,0,.073-.858l-.584-.861,1.408-.959.583.861a.681.681,0,0,0,.823.248,6.7,6.7,0,0,1,2.455-.511.681.681,0,0,0,.657-.555l.195-1.021,1.672.32L841.17,327a.684.684,0,0,0,.408.759,6.712,6.712,0,0,1,2.094,1.381.681.681,0,0,0,.857.074l.858-.585.957,1.412-.859.584a.686.686,0,0,0-.248.826,6.747,6.747,0,0,1,.511,2.46.684.684,0,0,0,.554.661l1.018.194Z" transform="translate(-6.227 -3.605)" fill="#f5f5f5" stroke="#fff" stroke-width="1"/>'
            + '<path id="Path_335" data-name="Path 335" d="M842.38,331.719a4.91,4.91,0,0,0-1.837,9.647h0a4.91,4.91,0,0,0,1.837-9.647Zm2.555,5.488a3.536,3.536,0,0,1-4.136,2.817h0a3.545,3.545,0,0,1,.655-7.027,3.586,3.586,0,0,1,.67.064A3.548,3.548,0,0,1,844.935,337.207Z" transform="translate(-8.725 -6.109)" fill="#f5f5f5" stroke="#fff" stroke-width="1"/>'
            + '<path id="Path_336" data-name="Path 336" d="M817.181,326.946l.126.882a.512.512,0,0,0,.507.44.539.539,0,0,0,.072-.005l2.281-.328a.513.513,0,0,0,.434-.581l-.127-.883a6.059,6.059,0,0,0,1.235-.734l.713.534a.51.51,0,0,0,.716-.1l1.381-1.848a.514.514,0,0,0-.1-.719l-.712-.535a6.087,6.087,0,0,0,.356-1.394l.881-.127a.508.508,0,0,0,.337-.2.513.513,0,0,0,.1-.38l-.328-2.286a.512.512,0,0,0-.58-.436l-.88.127a6.107,6.107,0,0,0-.733-1.238l.534-.714a.515.515,0,0,0-.1-.719l-1.844-1.385a.512.512,0,0,0-.718.1l-.534.715a6.024,6.024,0,0,0-1.39-.357l-.127-.883a.512.512,0,0,0-.58-.435l-2.281.328a.513.513,0,0,0-.434.582l.126.882a6.029,6.029,0,0,0-1.234.735l-.713-.535a.512.512,0,0,0-.718.1L811.46,317.4a.514.514,0,0,0,.1.718l.713.535a6.082,6.082,0,0,0-.357,1.394l-.88.127a.513.513,0,0,0-.434.581l.327,2.287a.512.512,0,0,0,.58.435l.88-.126a6.1,6.1,0,0,0,.733,1.237l-.534.714a.515.515,0,0,0,.1.719l1.844,1.384a.511.511,0,0,0,.717-.1l.534-.714A6.051,6.051,0,0,0,817.181,326.946Zm-1.97-1.3-.468.625-1.024-.768.467-.626a.515.515,0,0,0-.025-.647,5.066,5.066,0,0,1-.962-1.624.513.513,0,0,0-.554-.333l-.771.112-.181-1.27.771-.111a.513.513,0,0,0,.438-.476,5.066,5.066,0,0,1,.467-1.829.514.514,0,0,0-.157-.629l-.625-.469.767-1.026.625.469a.51.51,0,0,0,.645-.026,5.054,5.054,0,0,1,1.62-.964.513.513,0,0,0,.332-.556l-.11-.773,1.267-.183.11.773a.512.512,0,0,0,.475.44,5.036,5.036,0,0,1,1.825.469.511.511,0,0,0,.627-.157l.468-.626,1.024.769-.467.625a.515.515,0,0,0,.025.647,5.066,5.066,0,0,1,.962,1.624.514.514,0,0,0,.555.333l.771-.111.182,1.269-.771.111a.513.513,0,0,0-.439.476,5.084,5.084,0,0,1-.467,1.83.513.513,0,0,0,.157.628l.624.469-.768,1.026-.624-.469a.511.511,0,0,0-.645.026,5.067,5.067,0,0,1-1.62.965.512.512,0,0,0-.332.556l.11.773-1.267.183-.11-.773a.512.512,0,0,0-.475-.44,5.052,5.052,0,0,1-1.826-.469.51.51,0,0,0-.626.157Z" fill="#f5f5f5"/>'
            + '<path id="Path_337" data-name="Path 337" d="M820.391,326.395a3.678,3.678,0,1,0-.526.038A3.694,3.694,0,0,0,820.391,326.395Zm-3.154-3.275a2.667,2.667,0,0,1,2.253-3.016,2.626,2.626,0,0,1,.38-.027,2.664,2.664,0,1,1-2.633,3.043Z" transform="translate(-1.877 -1.881)" fill="#f5f5f5"/>'
            + '</g>'
            + '</svg>',


          'simulation':
            '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32.84 32.84">'
            + '<g id="simulation" data-name="simulation" transform="translate(-1217.6 -330.737)">'
            + '<path id="Path_340" data-name="Path 340" d="M1310.439,331.174a.545.545,0,0,0-.405.161.565.565,0,0,0-.17.4l-.072,11.184a.564.564,0,0,0,.35.526.554.554,0,0,0,.214.042.563.563,0,0,0,.4-.172l7.88-8.14a.566.566,0,0,0-.022-.808A12.669,12.669,0,0,0,1310.439,331.174Zm.49,10.345.059-9.189a11.6,11.6,0,0,1,6.429,2.487Z" transform="translate(-73.895 -0.362)" fill="currentColor"/>'
            + '<path id="Path_341" data-name="Path 341" d="M1248.607,354.245l-14.06-7.385v-15.49a.628.628,0,0,0-.62-.626l-.121,0c-.07,0-.14,0-.211,0-8.969,0-16,7.248-16,16.5a16.585,16.585,0,0,0,16.631,16.5c6.213,0,12.377-3.652,14.657-8.683A.623.623,0,0,0,1248.607,354.245Z" transform="translate(0)" fill="currentColor"/>'
            + '<path id="Path_342" data-name="Path 342" d="M1324.486,359.764a13.893,13.893,0,0,0-1-1.38.384.384,0,0,1-.313-.363c-.181-.2-.344-.377-.5-.531a.355.355,0,0,0-.269-.111.377.377,0,0,0-.267.114l-1.108,1.141a.377.377,0,0,0-.089.15l-.123.393a.373.373,0,0,0-.4.085l-2.06,2.122a.378.378,0,0,0-.089.151l-.123.392a.37.37,0,0,0-.4.086l-2.06,2.122a.376.376,0,0,0-.089.15l-.123.393a.372.372,0,0,0-.4.086l-1.651,1.7a.377.377,0,0,0,.092.595l.957.514a.372.372,0,0,0,.177.045.278.278,0,0,0,.03-.006.368.368,0,0,0,.146.151l1.195.641a.374.374,0,0,0,.178.045c.01,0,.02-.005.03-.006a.37.37,0,0,0,.147.151l1.194.642a.371.371,0,0,0,.177.045c.01,0,.02-.005.03-.005a.367.367,0,0,0,.146.151l1.2.642a.373.373,0,0,0,.177.044c.01,0,.02,0,.029-.005a.371.371,0,0,0,.146.151l1.2.642a.378.378,0,0,0,.178.045c.01,0,.019-.005.03-.006a.373.373,0,0,0,.147.151l1.195.641a.379.379,0,0,0,.177.045c.01,0,.02-.005.03-.006a.367.367,0,0,0,.146.151l1.195.642a.376.376,0,0,0,.177.045c.01,0,.02,0,.03-.006a.367.367,0,0,0,.146.151l.7.377a.378.378,0,0,0,.177.045.393.393,0,0,0,.112-.017.379.379,0,0,0,.222-.187,13.155,13.155,0,0,0,1.294-6.057c0-.224-.006-.45-.019-.693a.374.374,0,0,0-.282-.339l.164-.524a.373.373,0,0,0,.014-.165,13.281,13.281,0,0,0-.63-2.575.37.37,0,0,0-.259-.24l.037-.118a.373.373,0,0,0-.011-.255,13.882,13.882,0,0,0-.878-1.78.37.37,0,0,0-.233-.172A.375.375,0,0,0,1324.486,359.764Zm-10.053,6.929-.117-.063.2-.208Zm1.548.832-.52-.279.83-2.649.9-.924Zm1.549.831-.519-.279,1.95-6.232.9-.923Zm1.549.831-.52-.279,3.073-9.813.774-.8.062.068Zm1.548.832-.52-.28,3.232-10.319c.142.194.282.4.418.6Zm4.209,2.26-.083-.045.983-3.139A11.215,11.215,0,0,1,1324.837,372.279Zm.914-7.066-2.025,6.469-.52-.279,2.311-7.379C1325.613,364.417,1325.692,364.815,1325.75,365.213Zm-1.215-3.837q.194.389.361.788l-2.721,8.687-.52-.279Z" transform="translate(-76.031 -21.048)" fill="currentColor"/>'
            + '</g>'
            + '/svg>',

          'legal-n-docs':
            '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32.84 32.84">'
            + '<g id="simulation" data-name="simulation" transform="translate(-1217.6 -330.737)">'
            + '<path id="Path_340" data-name="Path 340" d="M1310.439,331.174a.545.545,0,0,0-.405.161.565.565,0,0,0-.17.4l-.072,11.184a.564.564,0,0,0,.35.526.554.554,0,0,0,.214.042.563.563,0,0,0,.4-.172l7.88-8.14a.566.566,0,0,0-.022-.808A12.669,12.669,0,0,0,1310.439,331.174Zm.49,10.345.059-9.189a11.6,11.6,0,0,1,6.429,2.487Z" transform="translate(-73.895 -0.362)" fill="currentColor"/>'
            + '<path id="Path_341" data-name="Path 341" d="M1248.607,354.245l-14.06-7.385v-15.49a.628.628,0,0,0-.62-.626l-.121,0c-.07,0-.14,0-.211,0-8.969,0-16,7.248-16,16.5a16.585,16.585,0,0,0,16.631,16.5c6.213,0,12.377-3.652,14.657-8.683A.623.623,0,0,0,1248.607,354.245Z" transform="translate(0)" fill="currentColor"/>'
            + '<path id="Path_342" data-name="Path 342" d="M1324.486,359.764a13.893,13.893,0,0,0-1-1.38.384.384,0,0,1-.313-.363c-.181-.2-.344-.377-.5-.531a.355.355,0,0,0-.269-.111.377.377,0,0,0-.267.114l-1.108,1.141a.377.377,0,0,0-.089.15l-.123.393a.373.373,0,0,0-.4.085l-2.06,2.122a.378.378,0,0,0-.089.151l-.123.392a.37.37,0,0,0-.4.086l-2.06,2.122a.376.376,0,0,0-.089.15l-.123.393a.372.372,0,0,0-.4.086l-1.651,1.7a.377.377,0,0,0,.092.595l.957.514a.372.372,0,0,0,.177.045.278.278,0,0,0,.03-.006.368.368,0,0,0,.146.151l1.195.641a.374.374,0,0,0,.178.045c.01,0,.02-.005.03-.006a.37.37,0,0,0,.147.151l1.194.642a.371.371,0,0,0,.177.045c.01,0,.02-.005.03-.005a.367.367,0,0,0,.146.151l1.2.642a.373.373,0,0,0,.177.044c.01,0,.02,0,.029-.005a.371.371,0,0,0,.146.151l1.2.642a.378.378,0,0,0,.178.045c.01,0,.019-.005.03-.006a.373.373,0,0,0,.147.151l1.195.641a.379.379,0,0,0,.177.045c.01,0,.02-.005.03-.006a.367.367,0,0,0,.146.151l1.195.642a.376.376,0,0,0,.177.045c.01,0,.02,0,.03-.006a.367.367,0,0,0,.146.151l.7.377a.378.378,0,0,0,.177.045.393.393,0,0,0,.112-.017.379.379,0,0,0,.222-.187,13.155,13.155,0,0,0,1.294-6.057c0-.224-.006-.45-.019-.693a.374.374,0,0,0-.282-.339l.164-.524a.373.373,0,0,0,.014-.165,13.281,13.281,0,0,0-.63-2.575.37.37,0,0,0-.259-.24l.037-.118a.373.373,0,0,0-.011-.255,13.882,13.882,0,0,0-.878-1.78.37.37,0,0,0-.233-.172A.375.375,0,0,0,1324.486,359.764Zm-10.053,6.929-.117-.063.2-.208Zm1.548.832-.52-.279.83-2.649.9-.924Zm1.549.831-.519-.279,1.95-6.232.9-.923Zm1.549.831-.52-.279,3.073-9.813.774-.8.062.068Zm1.548.832-.52-.28,3.232-10.319c.142.194.282.4.418.6Zm4.209,2.26-.083-.045.983-3.139A11.215,11.215,0,0,1,1324.837,372.279Zm.914-7.066-2.025,6.469-.52-.279,2.311-7.379C1325.613,364.417,1325.692,364.815,1325.75,365.213Zm-1.215-3.837q.194.389.361.788l-2.721,8.687-.52-.279Z" transform="translate(-76.031 -21.048)" fill="currentColor"/>'
            + '</g>'
            + '/svg>',

          'account':
            '<svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 30 30">'
            + '<g id="Account" transform="translate(-135.862 -75.804)">'
            + '<circle id="Ellipse_122" data-name="Ellipse 122" cx="7.052" cy="7.052" r="7.052" transform="translate(144.672 76.477)" stroke-width="1.347" stroke="#f5f5f5" stroke-linecap="round" stroke-linejoin="round" fill="#f5f5f5"/>'
            + '<path id="Path_333" data-name="Path 333" d="M157.79,95.774a7.039,7.039,0,0,1-12.132,0,15.186,15.186,0,0,0-9.123,13.922h30.379A15.186,15.186,0,0,0,157.79,95.774Z" transform="translate(0 -3.753)" fill="#f5f5f5" stroke="#f5f5f5" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.347"/>'
            + '</g>'
            + '</svg>',


          'support': `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 33 34.383">
      <path id="Path_433" data-name="Path 433" d="M57.3,593.369H37.11a6.6,6.6,0,0,0-6.4,6.786v11.561a6.588,6.588,0,0,0,6.4,6.736h1.32l.1.15.44,9.149L48.6,618.6l.049-.15H57.3a6.588,6.588,0,0,0,6.4-6.736V600.155A6.6,6.6,0,0,0,57.3,593.369Zm-1.249,15.606H39.382a.614.614,0,0,1-.636-.6.625.625,0,0,1,.636-.654H56.053a.6.6,0,0,1,.636.654A.586.586,0,0,1,56.053,608.975Zm0-3.419H39.382a.693.693,0,0,1-.636-.653.614.614,0,0,1,.636-.6H56.053a.586.586,0,0,1,.636.6A.655.655,0,0,1,56.053,605.556Zm0-3.418H39.382a.693.693,0,0,1-.636-.653.657.657,0,0,1,.636-.654H56.053a.625.625,0,0,1,.636.654A.655.655,0,0,1,56.053,602.138Z" transform="translate(-30.706 -593.369)" fill="#fff"/>
    </svg>`,

          'predictions':
            `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" x="0" y="0" style="enable-background:new 0 0 512 512" xml:space="preserve" class="" viewBox="0 0 32 32"><g transform="matrix(0.25,0,0,0.25,191.99248123168934,191.99249839782712)"><g xmlns="http://www.w3.org/2000/svg"><path d="m457.73 122.494v-24.608c0-13.89-11.3-25.19-25.19-25.19h-5.31c-13.89 0-25.19 11.3-25.19 25.19v18.225h-15.69v-36.42c0-40.346-32.824-73.17-73.17-73.17h-13.47c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5h13.47c32.075 0 58.17 26.095 58.17 58.17v36.42h-29v-36.425c0-16.084-13.086-29.17-29.17-29.17h-114.38c-16.084 0-29.17 13.085-29.17 29.17v36.425h-29v-36.42c0-32.075 26.095-58.17 58.17-58.17h70.91c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5h-70.91c-40.346 0-73.17 32.824-73.17 73.17v36.42h-15.69v-18.225c0-13.89-11.3-25.19-25.19-25.19h-5.31c-13.89 0-25.19 11.3-25.19 25.19v24.607c-31.784 12.945-54.25 44.171-54.25 80.551v215.482c0 47.935 38.998 86.933 86.933 86.933h338.114c47.935 0 86.933-38.998 86.933-86.933v-215.482c0-36.38-22.466-67.606-54.25-80.55zm-40.69-24.608c0-5.619 4.571-10.19 10.19-10.19h5.31c5.619 0 10.19 4.571 10.19 10.19v20.034c-5.711-1.185-11.626-1.81-17.683-1.81h-8.007zm-232.41-18.2c0-7.813 6.356-14.17 14.17-14.17h114.38c7.813 0 14.17 6.356 14.17 14.17v36.425h-142.72zm-115.38 18.2c0-5.619 4.571-10.19 10.19-10.19h5.31c5.619 0 10.19 4.571 10.19 10.19v18.225h-8.007c-6.058 0-11.972.625-17.683 1.81zm427.73 320.641c0 39.664-32.269 71.933-71.933 71.933h-338.114c-39.664 0-71.933-32.269-71.933-71.933v-215.483c0-39.664 32.269-71.933 71.933-71.933h338.114c39.664 0 71.933 32.269 71.933 71.933z" fill="#ffffff" data-original="#000000" class=""/><path d="m366.76 253.99h-53.97v-53.98c0-15.23-12.39-27.62-27.62-27.62h-58.36c-15.229 0-27.62 12.39-27.62 27.62v53.98h-53.97c-15.23 0-27.62 12.39-27.62 27.62v58.35c0 15.229 12.39 27.62 27.62 27.62h15.52c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5h-15.52c-6.959 0-12.62-5.661-12.62-12.62v-58.35c0-6.959 5.661-12.62 12.62-12.62h61.47c4.142 0 7.5-3.358 7.5-7.5v-61.48c0-6.959 5.661-12.62 12.62-12.62h58.36c6.958 0 12.62 5.661 12.62 12.62v61.48c0 4.142 3.358 7.5 7.5 7.5h61.47c6.959 0 12.62 5.661 12.62 12.62v58.35c0 6.958-5.661 12.62-12.62 12.62h-61.47c-4.142 0-7.5 3.358-7.5 7.5v61.48c0 6.959-5.661 12.62-12.62 12.62h-58.36c-6.958 0-12.62-5.661-12.62-12.62v-61.48c0-4.142-3.358-7.5-7.5-7.5h-15.95c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5h8.45v53.98c0 15.23 12.39 27.62 27.62 27.62h58.36c15.229 0 27.62-12.39 27.62-27.62v-53.98h53.97c15.23 0 27.62-12.39 27.62-27.62v-58.35c0-15.229-12.39-27.62-27.62-27.62z" fill="#ffffff" data-original="#000000" class=""/></g></g></svg>`,

          'watchListNSimulation': '<svg xmlns="http://www.w3.org/2000/svg" width="21.501" height="22.281" viewBox="0 0 21.501 22.281">'
            + '<g id="_Watch_list_Simulation" data-name=" Watch list &amp; Simulation" transform="translate(-273.884 -471.584)">'
            + '  <g id="Group_9867" data-name="Group 9867" transform="translate(273.884 472.344)">'
            + '    <g id="Group_9864" data-name="Group 9864" transform="translate(0 1.977)">'
            + '      <g id="Group_9860" data-name="Group 9860">'
            + '        <path id="Path_1220" data-name="Path 1220" d="M290.491,497.256v6.027a.32.32,0,0,1-.332.3H277.6a.347.347,0,0,1-.235-.089l-2.569-2.352a.3.3,0,0,1-.1-.215V485.839a.32.32,0,0,1,.332-.3h5.752a5.258,5.258,0,0,1,.277-.746h-6.029a1.1,1.1,0,0,0-1.147,1.051V500.93a1,1,0,0,0,.336.743l2.569,2.352a1.2,1.2,0,0,0,.811.308h12.559a1.1,1.1,0,0,0,1.147-1.051v-6.374A3.128,3.128,0,0,0,290.491,497.256Z" transform="translate(-273.884 -484.788)" fill="#fff"/>'
            + '      </g>'
            + '      <g id="Group_9861" data-name="Group 9861" transform="translate(3.372 0.373)">'
            + '        <path id="Path_1221" data-name="Path 1221" d="M290.157,486.589" transform="translate(-290.157 -486.589)" fill="#fff"/>'
            + '      </g>'
            + '      <g id="Group_9862" data-name="Group 9862" transform="translate(4.675 0.373)">'
            + '        <path id="Path_1222" data-name="Path 1222" d="M296.445,486.589" transform="translate(-296.445 -486.589)" fill="#fff"/>'
            + '      </g>'
            + '      <g id="Group_9863" data-name="Group 9863" transform="translate(0.203 16.05)">'
            + '        <path id="Path_1223" data-name="Path 1223" d="M274.865,562.61a.392.392,0,0,1,.408-.373h2.117a1.1,1.1,0,0,1,1.147,1.051v1.938a.409.409,0,0,1-.815,0v-1.938a.32.32,0,0,0-.332-.3h-2.117A.392.392,0,0,1,274.865,562.61Z" transform="translate(-274.865 -562.237)" fill="#fff"/>'
            + '      </g>'
            + '    </g>'
            + '    <g id="Group_9865" data-name="Group 9865" transform="translate(8.711 0)">'
            + '      <path id="Path_1224" data-name="Path 1224" d="M315.921,475.25" transform="translate(-315.921 -475.25)" fill="#fff" stroke="#37474f" stroke-miterlimit="10" stroke-width="2"/>'
            + '    </g>'
            + '    <g id="Group_9866" data-name="Group 9866" transform="translate(7.218 2.15)">'
            + '      <line id="Line_229" data-name="Line 229" x2="2.986" fill="#37474f" stroke="#37474f" stroke-miterlimit="10" stroke-width="2"/>'
            + '    </g>'
            + '  </g>'
            + '  <path id="Path_1225" data-name="Path 1225" d="M297.476,471.584a9.266,9.266,0,1,0,9.266,9.266A9.266,9.266,0,0,0,297.476,471.584Zm-3.727,14.767a.439.439,0,0,1-.439.439h-.65a.439.439,0,0,1-.439-.439v-5.836a.439.439,0,0,1,.439-.439h.65a.439.439,0,0,1,.439.439Zm2.624,0a.439.439,0,0,1-.439.439h-.65a.439.439,0,0,1-.439-.439v-8.4a.439.439,0,0,1,.439-.439h.65a.439.439,0,0,1,.439.439Zm2.624,0a.439.439,0,0,1-.439.439h-.65a.439.439,0,0,1-.439-.439v-9.79a.439.439,0,0,1,.439-.439h.65a.439.439,0,0,1,.439.439Zm2.624,0a.439.439,0,0,1-.439.439h-.65a.439.439,0,0,1-.439-.439V473.726a.439.439,0,0,1,.439-.439h.65a.439.439,0,0,1,.439.439Z" transform="translate(-11.357)" fill="#fff"/>'
            + '</g>'
            + '</svg>',
        });
        // tslint:disable:max-line-length
        //  iconsLibrary.registerSvgPack('ListIconPackage', { 'investment-opportunities': '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><g id="Investor_opportunity" data-name="Investor_opportunity" transform="translate(-211 -242)"><g id="Group_256" data-name="Group 256" transform="translate(211 242)"><g id="Group_255" data-name="Group 255" transform="translate(0)"><path id="Path_320" data-name="Path 320" d="M260.424,255.47a.969.969,0,0,0-.97-.97h-3.879a.969.969,0,0,0-.97.97v13.576h5.818Zm8.242,1.939a.969.969,0,0,0-.97-.97h-3.879a.969.969,0,0,0-.97.97v11.636h5.818Zm3.879,14.061H243.455a1.455,1.455,0,1,0,0,2.909h29.091a1.455,1.455,0,0,0,0-2.909Zm-20.364-11.152a.969.969,0,0,0-.97-.97h-3.879a.969.969,0,0,0-.97.97v8.727h5.818Z" transform="translate(-242 -242.379)" fill="currentColor"/><path id="Path_321" data-name="Path 321" d="M270.179,242.009l-4.36.623a.861.861,0,0,0-.487,1.461l1.008,1.008-3.517,3.516-5.777-4.381a1.456,1.456,0,0,0-1.8.035l-9.212,7.571a1.455,1.455,0,1,0,1.846,2.249l8.325-6.843,5.873,4.454a1.453,1.453,0,0,0,1.906-.131l4.414-4.413.673.672a.861.861,0,0,0,1.46-.487l.623-4.36A.861.861,0,0,0,270.179,242.009Z" transform="translate(-242.106 -242)" fill="currentColor"/></g></g></g></svg>', });
        //  iconsLibrary.registerSvgPack('ListIconPackage', { 'investment-opportunities': '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><g id="Investor_opportunity" data-name="Investor_opportunity" transform="translate(-211 -242)"><g id="Group_256" data-name="Group 256" transform="translate(211 242)"><g id="Group_255" data-name="Group 255" transform="translate(0)"><path id="Path_320" data-name="Path 320" d="M260.424,255.47a.969.969,0,0,0-.97-.97h-3.879a.969.969,0,0,0-.97.97v13.576h5.818Zm8.242,1.939a.969.969,0,0,0-.97-.97h-3.879a.969.969,0,0,0-.97.97v11.636h5.818Zm3.879,14.061H243.455a1.455,1.455,0,1,0,0,2.909h29.091a1.455,1.455,0,0,0,0-2.909Zm-20.364-11.152a.969.969,0,0,0-.97-.97h-3.879a.969.969,0,0,0-.97.97v8.727h5.818Z" transform="translate(-242 -242.379)" fill="currentColor"/><path id="Path_321" data-name="Path 321" d="M270.179,242.009l-4.36.623a.861.861,0,0,0-.487,1.461l1.008,1.008-3.517,3.516-5.777-4.381a1.456,1.456,0,0,0-1.8.035l-9.212,7.571a1.455,1.455,0,1,0,1.846,2.249l8.325-6.843,5.873,4.454a1.453,1.453,0,0,0,1.906-.131l4.414-4.413.673.672a.861.861,0,0,0,1.46-.487l.623-4.36A.861.861,0,0,0,270.179,242.009Z" transform="translate(-242.106 -242)" fill="currentColor"/></g></g></g></svg>', });
        //  iconsLibrary.registerSvgPack('ListIconPackage', { 'investment-opportunities': '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><g id="Investor_opportunity" data-name="Investor_opportunity" transform="translate(-211 -242)"><g id="Group_256" data-name="Group 256" transform="translate(211 242)"><g id="Group_255" data-name="Group 255" transform="translate(0)"><path id="Path_320" data-name="Path 320" d="M260.424,255.47a.969.969,0,0,0-.97-.97h-3.879a.969.969,0,0,0-.97.97v13.576h5.818Zm8.242,1.939a.969.969,0,0,0-.97-.97h-3.879a.969.969,0,0,0-.97.97v11.636h5.818Zm3.879,14.061H243.455a1.455,1.455,0,1,0,0,2.909h29.091a1.455,1.455,0,0,0,0-2.909Zm-20.364-11.152a.969.969,0,0,0-.97-.97h-3.879a.969.969,0,0,0-.97.97v8.727h5.818Z" transform="translate(-242 -242.379)" fill="currentColor"/><path id="Path_321" data-name="Path 321" d="M270.179,242.009l-4.36.623a.861.861,0,0,0-.487,1.461l1.008,1.008-3.517,3.516-5.777-4.381a1.456,1.456,0,0,0-1.8.035l-9.212,7.571a1.455,1.455,0,1,0,1.846,2.249l8.325-6.843,5.873,4.454a1.453,1.453,0,0,0,1.906-.131l4.414-4.413.673.672a.861.861,0,0,0,1.46-.487l.623-4.36A.861.861,0,0,0,270.179,242.009Z" transform="translate(-242.106 -242)" fill="currentColor"/></g></g></g></svg>', });
  }

}