import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filters: string[];

  constructor() {
    this.filters = this.fetch() || [];
  }

  public fetch() {
    const filters = localStorage.getItem('filters');
    return JSON.parse(filters) || [];
  }

  public persist(filters) {
    localStorage.setItem('filters', JSON.stringify(filters));
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
    this.persist(this.filters);

    return this.filters;
  }
}
