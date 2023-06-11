import { Component, OnInit } from '@angular/core';
import { WorkerServiceService } from '../../services/worker-service.service';

@Component({
  selector: 'ngx-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.scss'],
})
export class MedicationsComponent implements OnInit {

  name = 'Medication';
  constructor(public dataService: WorkerServiceService) { }

  ngOnInit() {

  }

}
