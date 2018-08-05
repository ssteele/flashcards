import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private version: string = '1.0.0';
  private resetFields: string[] = [
    'filters',
  ];

  constructor() {}

  public initialize() {
    const storedVersion = JSON.parse(localStorage.getItem('version'));

    if (storedVersion !== this.version) {
      this.clearStoredFields(this.resetFields);
    }

    localStorage.setItem('version', JSON.stringify(this.version));
  }

  private clearStoredFields(fields) {
    for (let field of fields) {
      localStorage.removeItem(field);
    }
  }
}
