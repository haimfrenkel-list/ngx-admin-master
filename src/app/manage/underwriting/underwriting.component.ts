import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServerTokenService } from "../../services/server-token.service";
import { UnderwritingDataService } from "./underwriting-data.service";

@Component({
  selector: 'ngx-underwriting',
  templateUrl: './underwriting.component.html',
  styleUrls: ['./underwriting.component.scss'],
})
export class UnderwritingComponent implements OnInit {
  names: string[] = []
  constructor(private route: Router, private service: ServerTokenService, private serviceData: UnderwritingDataService) { }

  ngOnInit() {
    this.getUserNames()
  }

  getUserNames() {
    this.service.getWithToken('underwriting/usrNames').subscribe((names: any[]) => {
      this.converNamesToArr(names)
    })
  }

  getGroupsTitle() {
    this.service.getWithToken('underwriting/getTitles').subscribe(data => {
      this.serviceData.groupNames = data['titles']
    })
  }

  converNamesToArr(names: any[]) {
    names.forEach(element => {
      if (element['privateName']) {
        this.names.push(element['privateName'])
      }
    });
    this.serviceData.userNames = this.names      
  }


}