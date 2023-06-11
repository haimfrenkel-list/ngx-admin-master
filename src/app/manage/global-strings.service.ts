import { Injectable } from '@angular/core';


import strings from './strings_en.json';

@Injectable({
  providedIn: 'root'
})    
export class GlobalStringsService {

  constructor() { }

  getStrings() { 
  console.log(strings);
  
    return strings;
  }
}  