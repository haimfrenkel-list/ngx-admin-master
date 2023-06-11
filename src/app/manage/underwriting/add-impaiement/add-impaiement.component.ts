import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServerService } from '../../../services/server.service';
import * as XLSX from 'xlsx';
import { ServerTokenService } from '../../../services/server-token.service';
import { RoundPipe } from '../../../@theme/pipes';
import { Router } from '@angular/router';
import { ConvertExcel } from 'shared';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'ngx-add-impaiement',
  templateUrl: './add-impaiement.component.html',
  styleUrls: ['./add-impaiement.component.scss']
})
export class AddImpaiementComponent implements OnInit {
version: number
  categorys
  obj = {}
  fileName
  willDownload: boolean = false
  emptyObj = {
    impairment: 'null',
    severity: null,
    category: []
  }
  constructor(private service: ServerTokenService, private route: Router) { }
  @Output() action = new EventEmitter<string>();

  ngOnInit() {
    this.getCatgories()
    this.setBackButton()
    this.getLastVersion()
  }

  setBackButton() {
    history.pushState(null, '', location.href);
    window.onpopstate = function () {
      history.go(1);
    };
    fromEvent(window, 'popstate').subscribe(() => {
      this.action.emit('underwriting')
    })
  }

  getCatgories() {
    this.service.getWithToken('underwriting/getCat').subscribe(ca => {
      this.categorys = ca[0]['categories']
    })
  }

  // add() {
  //   this.obj[this.emptyObj.impairment] = {
  //     impairment: this.emptyObj.impairment,
  //     severity: this.emptyObj.severity.split(","),
  //     category: this.emptyObj.category
  //   }
  //   this.emptyObj = {
  //     impairment: null,
  //     severity: null,
  //     category: []
  //   }

  // }

  pushCategory(event, category) {
    this.emptyObj.category.push(category)
  }



  save() {
    let body = {
      impairment: this.emptyObj.impairment,
      severity: this.emptyObj.severity ? this.emptyObj.severity.includes(',') ? this.emptyObj.severity.split(",") : this.emptyObj.severity : null,
      category: this.emptyObj.category
    }
    this.service.postWithToken<any>('underwriting/upImp', body).subscribe(im => {
      this.action.emit('edit')
    })
  }

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.converToImpaiements(jsonData)
    }
    reader.readAsBinaryString(file);
  }

  getLastVersion(){
    let last
    this.service.getWithToken('underwriting/getVer').subscribe(version=>{
     this.version =  Number(version['vers'].version) ? Number(version['vers'].version) +1 : 1

    })
  }

  exportData() {
    this.service.getWithToken('underwriting/getAll').subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        data[i].severity = data[i].severity ? data[i].severity.toString() : data[i].severity
        data[i].categorys = data[i].categorys ? data[i].categorys.toString() : data[i].categorys
      }
      ConvertExcel.writeExcel(data, `impaiement ${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}.csv`)
    })
  }

  converToImpaiements(data: any) {
   
    let impaiements = []
    data['Manual'].forEach(element => {
      let impaiement = {
        ICD10Codes: element['ICD 10 Codes'],
        Synonyms: element['Synonyms'],
        Medication: element['Treatment / Medication'],
        Referencetests: element['Reference tests'],
        RANGE: element['RANGE'] ? element['RANGE'].split(",") : null,
        Credits: element['Credits'],
        VeryMild: element['Very Mild'],
        Type: element['Type'] ? element['Type'].split(",") : null,
        Comment: element['Comment'],
        Mild: element['Mild'],
        Moderate: element['Moderate'],
        Severe: element['Severe'],
        VerySevere: element['Very Severe'],
        Notes: element['Notes'],
        impairment: element['IMPAIRMENT'].trim(),
        severity: element['Severity Description'] ? element['Severity Description'].split(",") : null,
        categorys: element['Category'] ? element['Category'].split(",") : null,
        RecommendedDebit: element['Recommended debit']
      }
      impaiements.push(impaiement)
    });
    let catgories = []
    data['Categories'].forEach(cat => {
      catgories.push(cat['name'].trim())
    })

    let body = {
      implements: impaiements,
      catgories: catgories,
      version: this.version
    }
    this.service.postWithToken('underwriting/import', body).subscribe(data => {
      alert(data['msg'])
      this.action.emit('edit')
    })
  }

  addCatgory(cat: string) {
    let body = { catgory: cat }
    this.service.postWithToken('underwriting/addCat', body).subscribe(ca => {
      this.getCatgories()

    })
  }
}
