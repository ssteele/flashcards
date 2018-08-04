import { Injectable } from '@angular/core';
import { Conjugation } from '../models/conjugation';
import { CONJUGATIONS } from '../data/conjugations';

@Injectable({
  providedIn: 'root'
})
export class ConjugationService {
  tags: string[];
  conjugations: Conjugation[];
  conjugation: Conjugation;

  constructor() {}

  getTags() {
    // collect all tags
    let tags = [];
    CONJUGATIONS.forEach((conjugation) => {
      tags = tags.concat(conjugation.tags);
    });

    // filter unique tags
    return tags.filter((tag, i, array) => {
      return array.indexOf(tag) === i;
    });
  }

  filter(conjugations: Conjugation[], filters: string[]): Conjugation[] {
    return conjugations.filter(function (conjugation) {
      // return filters.every((filter) => {                           // use `some` if inclusive filtering is desired
      return filters.some((filter) => {                            // use `every` if exclusive filtering is desired
        return -1 !== conjugation.tags.indexOf(filter);
      });
    });
  }

  shuffle(conjugations: Conjugation[]): Conjugation[] {
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

  reduce(conjugations: Conjugation[], maxCount: number): Conjugation[] {
    if (maxCount < conjugations.length) {
      conjugations = conjugations.slice(0, maxCount);
    }
    return conjugations;
  }

  get(maxCount: number, filters?: string[]): Conjugation[] {
    let conjugations = CONJUGATIONS;

    conjugations = this.filter(conjugations, filters);
    conjugations = this.shuffle(conjugations);
    conjugations = this.reduce(conjugations, maxCount);

    return conjugations;
  }
}
