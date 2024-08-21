import { TestBed } from '@angular/core/testing';

import { MediationService } from './mediation.service';

describe('MediationService', () => {
  let service: MediationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
