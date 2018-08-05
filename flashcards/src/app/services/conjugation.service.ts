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

  public getTags() {
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

  private filter(conjugations: Conjugation[], filters: string[]): Conjugation[] {
    return conjugations.filter(function (conjugation) {
      // return filters.every((filter) => {                            // exclusive
      return filters.some((filter) => {                             // inclusive
        return -1 !== conjugation.tags.indexOf(filter);
      });
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

  public get(maxCount: number, filters?: string[]): Conjugation[] {
    let conjugations = CONJUGATIONS;

    conjugations = this.filter(conjugations, filters);
    conjugations = this.shuffle(conjugations);
    conjugations = this.reduce(conjugations, maxCount);

    return conjugations;
  }
}
