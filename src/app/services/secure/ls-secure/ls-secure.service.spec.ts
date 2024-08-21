import { TestBed } from '@angular/core/testing';

import { LsSecureService } from './ls-secure.service';

describe('LsSecureService', () => {
  let service: LsSecureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LsSecureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
