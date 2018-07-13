import { TestBed, inject } from '@angular/core/testing';

import { ConjugationService } from './conjugation.service';

describe('ConjugationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConjugationService]
    });
  });

  it('should be created', inject([ConjugationService], (service: ConjugationService) => {
    expect(service).toBeTruthy();
  }));
});
