import { Injectable } from '@angular/core';
import strings from './strings.json'

@Injectable({
  providedIn: 'root'
})
export class PolicyHolderStringsService {

  constructor() { }

  getStrings():{} {
    return strings;
  };
  
}
