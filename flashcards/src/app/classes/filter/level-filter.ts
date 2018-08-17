import { Injectable } from '@angular/core';
import { BaseFilter } from "./base-filter";
import { ConjugationService } from '../../services/conjugation.service';

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
