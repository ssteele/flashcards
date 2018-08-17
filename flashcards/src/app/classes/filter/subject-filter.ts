import { Injectable } from '@angular/core';
import { BaseFilter } from "./base-filter";
import { ConjugationService } from '../../services/conjugation.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectFilter extends BaseFilter {
  constructor(
    protected conjugationService: ConjugationService,
  ) {
    super(conjugationService);
  }
}
