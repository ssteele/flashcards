import { ConjugationService } from '../../services/conjugation.service';

export class BaseFilter {
  constructor(
    protected conjugationService: ConjugationService,
  ) {}

  public getDescription(filter: string): string {
    return '';
  }
}
