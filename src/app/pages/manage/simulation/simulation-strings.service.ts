import { Injectable } from '@angular/core';
import strings from './strings.json'


@Injectable({
  providedIn: 'root'
})
export class SimulationStringsService {

  constructor() { }

  getStrings():{} {
    return strings;
  }
}
