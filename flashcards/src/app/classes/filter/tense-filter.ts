import { Injectable } from '@angular/core';

import { ConjugationService } from '../../services/conjugation.service';

import { BaseFilter } from "./base-filter";

@Injectable({
  providedIn: 'root'
})
export class TenseFilter extends BaseFilter {
  constructor(
    protected conjugationService: ConjugationService,
  ) {
    super(conjugationService);
  }
}
