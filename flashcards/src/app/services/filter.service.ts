import { Injectable } from '@angular/core';
import { CONSTANTS } from '../data/constants';
import { Filter } from '../models/filter';
import { StoreService } from '../services/store.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filters: Filter;
  filterProperties: string[] = CONSTANTS.FILTERS;
  defaultFilters = {
    level: ['1'],
    tense: ['present'],
  }

  constructor(
    private storeService: StoreService
  ) {
    this.filters = this.fetch();
    if (!this.filters) {
      // store default filters if no filters saved
      this.filters = this.defaultFilters;
      this.persist(this.filters);
    }
  }

  public fetch() {
    return this.storeService.fetch('filters');
  }

  public persist(filters) {
    this.storeService.persist('filters', filters);
  }

  public get() {
    return this.filters;
  }

  public getEmpty(filters) {
    let emptyFilterProperties = [];
    for (const property of this.filterProperties) {
      if ('undefined' === typeof filters[property] || filters[property].length < 1) {
        emptyFilterProperties.push(property);
      }
    }
    return emptyFilterProperties;
  }

  public setFilter(group, filter, isChecked) {
    const index = this.filters[group].indexOf(filter);

    if (isChecked && -1 === index) {
      this.filters[group].push(filter);
    } else if (!isChecked && -1 !== index) {
      this.filters[group].splice(index, 1);
    }

    this.persist(this.filters);
  }
}
