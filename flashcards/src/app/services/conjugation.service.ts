import { Injectable } from '@angular/core';

import { Conjugation } from '../models/conjugation';
import { Filter } from '../models/filter';

import { CONSTANTS } from '../data/constants';
import { CONJUGATIONS } from '../data/conjugations';

@Injectable({
  providedIn: 'root'
})
export class ConjugationService {
  filterProperties: string[] = CONSTANTS.FILTERS;
  conjugations: Conjugation[];
  conjugation: Conjugation;

  constructor() {}

  public getFilters(): Filter {
    let filter: Filter = new Filter;
    for (const property of this.filterProperties) {
      filter[property] = this.getUnique(this.getPropertyValues(property))
    }

    return filter;
  }

  public getFilterProperties() {
    return this.filterProperties;
  }

  private getPropertyValues(property) {
    let values = [];
    CONJUGATIONS.forEach((conjugation) => {
      values = values.concat(conjugation[property]);
    });

    return values;
  }

  private getUnique(values) {
    return values.filter((value, i, array) => {
      return array.indexOf(value) === i;
    });
  }

  public getVerbsInLevel(level: string): string[] {
    let infinitives = [];
    CONJUGATIONS.filter((conjugation) => {
      return conjugation.level === level;
    }).forEach((conjugation) => {
      infinitives = infinitives.concat(conjugation.infinitive.spanish);
    });

    return this.getUnique(infinitives).join(', ');
  }
}
