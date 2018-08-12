import { Injectable } from '@angular/core';
import { CONSTANTS } from '../data/constants';
import { Conjugation } from '../models/conjugation';
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

  public getFilters() {
    let filter: any = {};

    filter.tense = this.getUnique(this.getPropertyValues('tense'));
    filter.level = this.getUnique(this.getPropertyValues('level'));

    return filter;
  }

  private filter(conjugations: Conjugation[], filters: string[]): Conjugation[] {
    return conjugations.filter(function (conjugation) {
      const level = filters['level'].some((filter) => {
        return conjugation.level === filter;
      });

      const tense = filters['tense'].some((filter) => {
        return conjugation.tense === filter;
      });

      return level && tense;

    // const filterProperties = this.filterProperties;
    // return conjugations.filter(function (conjugation) {
      // let isFound = true;
      // for (const property of filterProperties) {
      //   const tense = filters['tense'].some((filter) => {
      //     return conjugation.tense === filter;
      //   });
      // }

      // return isFound;
    // });

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

  public get(maxCount: number, filters: string[]): Conjugation[] {
    let conjugations = CONJUGATIONS;

    conjugations = this.filter(conjugations, filters);
    conjugations = this.shuffle(conjugations);
    conjugations = this.reduce(conjugations, maxCount);

    return conjugations;
  }
}
