import { Injectable } from '@angular/core';
import strings from './strings.json';

@Injectable({
  providedIn: 'root'
})
export class InvestmentOpportunitiesStringsService {

  constructor() { 
    console.log('InvestmentOpportunitiesStringsService constructor');
  }

  getString():{} {
    return strings;
  }
}
