import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private isNightMode: boolean;

  constructor() {
    this.isNightMode = this.fetch('isNightMode') || false;
  }

  private fetch(setting) {
    return JSON.parse(localStorage.getItem(setting));
  }

  private persist(setting, value) {
    localStorage.setItem(setting, JSON.stringify(value));
  }

  public setNightMode(isChecked) {
    this.isNightMode = isChecked;
    this.persist('isNightMode', this.isNightMode);

    return this.isNightMode;
  }

  public getNightMode() {
    return this.isNightMode;
  }
}
