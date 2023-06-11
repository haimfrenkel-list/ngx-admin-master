import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { log } from 'console';
import { WorkerServiceService } from '../../services/worker-service.service';

@Component({
  selector: 'ngx-life-style',
  templateUrl: './life-style.component.html',
  styleUrls: ['./life-style.component.scss'],
})
export class LifeStyleComponent implements OnInit {
form: FormGroup
  name = 'Lifestyle';
  constructor(protected dataService: WorkerServiceService) { }

  ngOnInit() {
    

    this.initForm()
  }

  initForm() {
    this.form = new FormGroup({
      "Impairment Category": new FormControl(),
      "Impairment": new FormControl(),
      "Report Date": new FormControl(),
      "Event Feature Date": new FormControl(),
      "Value": new FormControl(),
      "Expanded Value": new FormControl(),     
      "Page": new FormControl(),
    })
  }

  // save() {
  //   console.log(this.form.value);
  //   if (this.dataService.tables['Lifestyle']) {
  //     this.dataService.tables['Lifestyle'].push(this.form.value)
  //     console.log(this.dataService.tables['Lifestyle']);
  //     this.initForm()
  //   }
  // }

}
