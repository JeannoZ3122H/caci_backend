import { TestBed } from '@angular/core/testing';

import { InfoPratiqueService } from './info-pratique.service';

describe('InfoPratiqueService', () => {
  let service: InfoPratiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoPratiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
