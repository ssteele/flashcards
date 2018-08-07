import { Injectable } from '@angular/core';
import { StoreService } from '../services/store.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filters: string[];
  defaultFilters: string[] = ['present'];

  constructor(
    private storeService: StoreService
  ) {
    this.filters = this.fetch() || this.defaultFilters;
  }

  public fetch() {
    let response = null;

    const filters = this.storeService.fetch('filters');

    if (filters && filters.length > 0) {
      response = filters;
    }

    return response;
  }

  public persist(filters) {
    this.storeService.persist('filters', filters);
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
