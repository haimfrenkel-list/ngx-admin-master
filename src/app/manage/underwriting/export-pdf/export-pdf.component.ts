import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { fromEvent } from 'rxjs';
import { ServerTokenService } from '../../../services/server-token.service';
import { UnderwritingDataService } from '../underwriting-data.service';

@Component({
  selector: 'ngx-export-pdf',
  templateUrl: './export-pdf.component.html',
  styleUrls: ['./export-pdf.component.scss']
})
export class ExportPDFComponent implements OnInit {

  @ViewChild('toPdf', { static: false }) toPdf: ElementRef;
  @ViewChild('download', { static: false }) download: ElementRef;
  @Input() pdfData: any
  @Output() action = new EventEmitter<string>();

  data;
  charts
  fileUrl
  fileName
  LEdata
  constructor(private server: ServerTokenService, private sanitizer: DomSanitizer, private router: Router, private serviceData: UnderwritingDataService) {

  }

  ngOnInit() {
    this.data = this.serviceData.data
    this.charts = this.serviceData.data['charts']
    this.setBackButton()
  }

  setBackButton(){
    history.pushState(null, '', location.href);
    window.onpopstate = function () {
      history.go(1);
    };
    fromEvent(window, 'popstate').subscribe(() => {
      this.action.emit('underwriting')
    })
  }


  
  downloadPdf() {
    // this.loading = true;
    // this.router.navigateByUrl('/manage/investment-opportunities');
    // function getAllStyle(t) {
    //   var strStyle = "";

    //   for (let i = 0; i < t.length; i++) {
    //     for (let k = 0; k < t[i].length; k++) {
    //       strStyle += t[i][k].cssText + '\n';
    //     }
    //   }
    //   return strStyle;
    // }
    // function getAllRules() {
    //   const list = document.styleSheets;
    //   var array = []
    //   for (var i = 0; i < list.length; i++) {
    //     array.push(list[i]['cssRules'])
    //   }
    //   return array;
    // }
    function cssSpcElement(a) {
      var sheets = document.styleSheets, o = [];
      a.matches = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector || a.oMatchesSelector;
      for (var i in sheets) {
        var rules = sheets[i]['rules'] || sheets[i]['cssRules'];
        for (var r in rules) {
          if (a.matches(rules[r]['selectorText'])) {
            o.push(rules[r].cssText);
          }
        }
      }
      return o;
    }

    function recGetElements(el, arr) {
      arr.push(el);
      if (el.children.length) {
        for (let i = 0; i < el.children.length; i++) {
          recGetElements(el.children[i], arr);
        }
      }
    }

    function printAllStyle(t) {
      var strStyle = "";

      for (var i = 0; i < t.length; i++) {
        strStyle += t[i] + '\n';
      }
      return strStyle;
    }

    function collectAllStyles(elem) {
      let array = [];
      recGetElements(elem, array);
      let stylesArray = [];
      for (let index = 0; index < array.length; index++) {
        stylesArray = stylesArray.concat(cssSpcElement(array[index]));
      }
      stylesArray = stylesArray.filter((item, i, ar) => ar.indexOf(item) === i);
      var str = printAllStyle(stylesArray);
      return str;
    }

    let styleStr = '@font-face { font-family: "Varela Round"; src: url("https://list-crm.s3.us-east-2.amazonaws.com/assets/VarelaRound-Regular.ttf"); }' + '\n'
    styleStr += collectAllStyles(this.toPdf.nativeElement);
    // const styleStr = getAllStyle(getAllRules()).replace('./src/assets/fonts/Varela-Round/VarelaRound-Regular.tf', 'https://list-crm.s3.us-east-2.amazonaws.com/assets/VarelaRound-Regular.ttf')
    // .replace('url("VarelaRound-Regular.ttf','url("https://list-crm.s3.us-east-2.amazonaws.com/assets/VarelaRound-Regular.ttf' );

    var body = '<html><head><style>' + styleStr + '</style></head><body>' + this.toPdf.nativeElement.innerHTML + '</body></html>'
    const data = {
      filename: 'myCss.html',
      content_type: 'text/html'
    }
    var vb = new Blob([body]);

    this.server.postFileToAws('getHtmlUrl', data, vb, 'myCss.html').subscribe(data => {
      if (!data['done']) {
        return
      }
      this.server.downloadFile(data.baseUrl + '/' + data.fileName).subscribe(data => {
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(data));
        this.fileName = 'report.pdf'
        setTimeout(() => {
          this.download.nativeElement.click();
          this.router.navigateByUrl('manage/underwritin/newPatient')
        }, 1000);
        // this.download.nativeElement.click();
        // document.getElementById('downloadPdf').click();
      });
    })
  }
}
