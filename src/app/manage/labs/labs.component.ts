import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WorkerServiceService } from '../../services/worker-service.service';

@Component({
  selector: 'ngx-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.scss'],
})
export class LabsComponent implements OnInit {
  name = 'Labs';
  constructor(protected dataService: WorkerServiceService) { }
  form: FormGroup

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.form = new FormGroup({
      "Impairment Category": new FormControl(),
      "Impairment": new FormControl(),
      "Feature Date": new FormControl(),
      "Feature": new FormControl(),
      "Value": new FormControl(),
      "Normal Range": new FormControl(),
      "Unit Of Measurement": new FormControl(),
      "Clinician Name": new FormControl(),
      "Clinician Specialty": new FormControl(),
      "Result Evaluation": new FormControl(),
      "Page": new FormControl(),
    })
  }
  save() {
    console.log(this.form.value);

    if (this.dataService.allData.tables.Labs) {

      this.dataService.allData.tables.Labs.push(this.form.value)
      this.initForm()
    }

  }

}
