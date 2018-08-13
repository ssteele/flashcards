import { Injectable } from '@angular/core';
import { CONSTANTS } from '../data/constants';
import { Conjugation } from '../models/conjugation';
import { Filter } from '../models/filter';
import { CONJUGATIONS } from '../data/conjugations';

@Injectable({
  providedIn: 'root'
})
export class ConjugationService {
  filterProperties: string[] = CONSTANTS.FILTERS;
  conjugations: Conjugation[];
  conjugation: Conjugation;

  constructor() {}

  private getUnique(values) {
    return values.filter((value, i, array) => {
      return array.indexOf(value) === i;
    });
  }

  private getPropertyValues(property) {
    let values = [];
    CONJUGATIONS.forEach((conjugation) => {
      values = values.concat(conjugation[property]);
    });

    return values;
  }

  public getFilterProperties() {
    return this.filterProperties;
  }

  public getFilters(): Filter {
    let filter: Filter = new Filter;
    for (const property of this.filterProperties) {
      filter[property] = this.getUnique(this.getPropertyValues(property))
    }

    return filter;
  }

  private filter(conjugations: Conjugation[], filters: Filter): Conjugation[] {
    return conjugations.filter((conjugation) => {
      let isFound = true;
      for (const property of this.filterProperties) {
        isFound = filters[property].some((filter) => {
          return conjugation[property] === filter;
        });
        if (!isFound) {
          break;
        }
      }
      return isFound;
    });
  }

  private shuffle(conjugations: Conjugation[]): Conjugation[] {
    let currentIndex = conjugations.length, temporaryValue, randomIndex;

    // while there remain elements to shuffle...
    while (0 !== currentIndex) {

      // pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // and swap it with the current element
      temporaryValue = conjugations[currentIndex];
      conjugations[currentIndex] = conjugations[randomIndex];
      conjugations[randomIndex] = temporaryValue;
    }

    return conjugations;
  }

  private reduce(conjugations: Conjugation[], maxCount: number): Conjugation[] {
    if (maxCount < conjugations.length) {
      conjugations = conjugations.slice(0, maxCount);
    }
    return conjugations;
  }

  public get(maxCount: number, filters: Filter): Conjugation[] {
    let conjugations = CONJUGATIONS;

    conjugations = this.filter(conjugations, filters);
    conjugations = this.shuffle(conjugations);
    conjugations = this.reduce(conjugations, maxCount);

    return conjugations;
  }
}
