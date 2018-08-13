import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() {}

  public uppercaseFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
  }
}
