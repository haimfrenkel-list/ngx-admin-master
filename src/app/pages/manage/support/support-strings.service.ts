import { Injectable } from '@angular/core';
import strings from './strings.json'
import data from './qnaList.json';

@Injectable({
  providedIn: 'root'
})
export class SupportStringsService {

  constructor() { 
    console.log("SupportStringsService constructor");
  }

  getStrings():{} {
    return strings;
  }

  getQnA<T>(): {}[] {
    return data;
  }
}
