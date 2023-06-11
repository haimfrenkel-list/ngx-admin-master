import { Component, OnInit } from '@angular/core';
import { WorkerServiceService } from '../../services/worker-service.service';

@Component({
  selector: 'ngx-troubleshooting',
  templateUrl: './troubleshooting.component.html',
  styleUrls: ['./troubleshooting.component.scss'],
})
export class TroubleshootingComponent implements OnInit {

  constructor(protected dataService: WorkerServiceService) { }

  ngOnInit() {
  }

}
