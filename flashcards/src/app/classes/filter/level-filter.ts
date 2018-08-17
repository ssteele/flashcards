import { Injectable } from '@angular/core';

import { ConjugationService } from '../../services/conjugation.service';

import { BaseFilter } from "./base-filter";

@Injectable({
  providedIn: 'root'
})
export class LevelFilter extends BaseFilter {
  constructor(
    protected conjugationService: ConjugationService,
  ) {
    super(conjugationService);
  }

  public getDescription(filter: string): string {
    return '- ' + this.conjugationService.getVerbsInLevel(filter);
  }
}
