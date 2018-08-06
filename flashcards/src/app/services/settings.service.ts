import { Injectable } from '@angular/core';
import { StoreService } from '../services/store.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private isNightMode: boolean;

  constructor(
    private storeService: StoreService
  ) {
    this.isNightMode = this.storeService.fetch('isNightMode') || false;
  }

  public setNightMode(isChecked) {
    this.isNightMode = isChecked;
    this.storeService.persist('isNightMode', this.isNightMode);

    return this.isNightMode;
  }

  public getNightMode() {
    return this.isNightMode;
  }
}
