import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filters: string[];

  constructor() {
    // @TODO: fetch stored filters
    // this.filters = [];
    this.filters = ['present'];
    // this.filters = ['present', 'imperfect'];
  }

  public get() {
    return this.filters;
  }

  public setFilter(filter, isChecked) {
    const index = this.filters.indexOf(filter);
    if (isChecked && -1 === index) {
      this.filters.push(filter);
    } else if (!isChecked && -1 !== index) {
      this.filters.splice(index, 1);
    }
    return this.filters;
  }
}
