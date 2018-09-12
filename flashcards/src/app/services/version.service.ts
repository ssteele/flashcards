import { Injectable } from '@angular/core';

import { StoreService } from '../services/store.service';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private version: string = '1.0.8';
  private resetFields: string[] = [
    'filters',
    'cards',
    'cardIndex',
  ];

  constructor(
    private storeService: StoreService
  ) {}

  public initialize() {
    const storedVersion = this.storeService.fetch('version');

    if (storedVersion !== this.version) {
      this.clearStoredFields(this.resetFields);
    }

    this.storeService.persist('version', this.version);
  }

  private clearStoredFields(fields) {
    for (let field of fields) {
      this.storeService.delete(field);
    }
  }
}
