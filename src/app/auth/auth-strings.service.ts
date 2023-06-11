import { Injectable } from '@angular/core';
import strings from './strings.json';

@Injectable({
  providedIn: 'root'
})
export class AuthStringsService {

  constructor() { 
    console.log('AuthStringsService constructor');
  }

  getSrting() : {} {
    return strings;
  }
}
