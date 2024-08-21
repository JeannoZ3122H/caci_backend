import { TestBed } from '@angular/core/testing';

import { TermsAndPolicyService } from './terms-and-policy.service';

describe('TermsAndPolicyService', () => {
  let service: TermsAndPolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermsAndPolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
