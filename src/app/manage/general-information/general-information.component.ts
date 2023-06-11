import { Component, OnInit } from '@angular/core';
import { WorkerServiceService } from '../../services/worker-service.service';

@Component({
  selector: 'ngx-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss'],
})
export class GeneralInformationComponent implements OnInit {

  keys = [
    'Name',
    'Gender',
    'Age',
    'DOB',
    'Medical Records Start Date',
    'Medical Records End Date',
    'Marital Status',
    'Address',
    'State',
    'SSN',
    'Height',
    'Weight',
    'BMI',
    'Smoker',
  ];
  constructor(protected dataService: WorkerServiceService) { }

  ngOnInit() {
  }

}
