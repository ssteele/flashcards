import { Injectable } from '@angular/core';

import { Conjugation } from '../models/conjugation';
import { Filter } from '../models/filter';

import { CONSTANTS } from '../data/constants';
import { CONJUGATIONS } from '../data/conjugations';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  filterProperties: string[] = CONSTANTS.FILTERS;

  constructor() {}

  public get(maxCount: number, filters: Filter): Conjugation[] {
    let conjugations = CONJUGATIONS;

    conjugations = this.filter(conjugations, filters);
    conjugations = this.shuffle(conjugations);
    conjugations = this.reduce(conjugations, maxCount);

    return conjugations;
  }

  public filter(conjugations: Conjugation[], filters: Filter): Conjugation[] {
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

  public shuffle(conjugations: Conjugation[]): Conjugation[] {
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

  public reduce(conjugations: Conjugation[], maxCount: number): Conjugation[] {
    if (maxCount < conjugations.length) {
      conjugations = conjugations.slice(0, maxCount);
    }
    return conjugations;
  }
}
