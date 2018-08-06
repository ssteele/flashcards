import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  public fetch(setting) {
    return JSON.parse(localStorage.getItem(setting));
  }

  public persist(setting, value) {
    localStorage.setItem(setting, JSON.stringify(value));
  }

  public delete(setting) {
    localStorage.removeItem(setting);
  }
}
