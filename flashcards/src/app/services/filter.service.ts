import { Injectable } from '@angular/core';
import { StoreService } from '../services/store.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  // filters: string[];
  filters: any;
  defaultFilters = {
    level: ['1'],
    tense: ['present'],
  }

  constructor(
    private storeService: StoreService
  ) {
    this.filters = this.fetch();
  }

  public fetch() {
    let response = null;

    const filters = this.storeService.fetch('filters');

    response = this.defaultFilters;
    if (filters) {
      if (filters.level.length > 0) {
        response.level = filters.level;
      }
      if (filters.tense.length > 0) {
        response.tense = filters.tense;
      }
    } else {
      this.persist(response);
    }

    return response;
  }

  public persist(filters) {
    let result = false;
    if (filters && filters.level.length > 0 && filters.tense.length > 0) {
      this.storeService.persist('filters', filters);
      result = true;
    }

    return result;
  }

  public get() {
    return this.filters;
  }

  public setFilter(group, filter, isChecked) {
    const index = this.filters[group].indexOf(filter);

    if (isChecked && -1 === index) {
      this.filters[group].push(filter);
    } else if (!isChecked && -1 !== index) {
      this.filters[group].splice(index, 1);
    }

    return this.persist(this.filters);
  }
}
