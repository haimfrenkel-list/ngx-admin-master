import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WorkerServiceService } from '../../services/worker-service.service';

@Component({
  selector: 'ngx-impiaements',
  templateUrl: './impiaements.component.html',
  styleUrls: ['./impiaements.component.scss'],
})
export class ImpiaementsComponent implements OnInit {
  // tslint:disable:quotemark

  form: FormGroup

  name = 'Impairments';
  constructor(public dataService: WorkerServiceService) { }

  ngOnInit() {
    this.initForm()

    setTimeout(() => {
      // tslint:disable-next-line:no-console
    }, 5 * 1000);
  }

  initForm() {
    this.form = new FormGroup({
      "Impairment Category": new FormControl(),
      "Impairment": new FormControl(),
      "Feature": new FormControl(),
      "Report Date": new FormControl(),
      "Event Date": new FormControl(),
      "Clinician Name": new FormControl(),
      "Clinician Specialty": new FormControl(),
      "Value": new FormControl(),
      "Expanded Value": new FormControl(),
      "Page": new FormControl(),
    })
  }

  save() {
    console.log(this.form.value);

    if (this.dataService.allData.tables['Impairments']) {
      
      this.dataService.allData.tables['Impairments'].push(this.form.value)
      this.initForm()
    }

  }
}
