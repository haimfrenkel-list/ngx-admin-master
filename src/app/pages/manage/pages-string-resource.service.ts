import { Injectable } from '@angular/core';
import strings from './strings.json'

@Injectable({
  providedIn: 'root'
})
export class PagesStringResourceService {

  constructor() { }
  getStrings():{} {
    return strings;
  }

}
