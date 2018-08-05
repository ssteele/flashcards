import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filters: string[];
  defaultFilters: string[] = ['present'];

  constructor() {
    this.filters = this.fetch() || this.defaultFilters;
  }

  public fetch() {
    let response = null;

    const filtersString = localStorage.getItem('filters');
    const filtersArray = JSON.parse(filtersString);

    if (filtersArray && filtersArray.length > 0) {
      response = filtersArray;
    }

    return response;
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
