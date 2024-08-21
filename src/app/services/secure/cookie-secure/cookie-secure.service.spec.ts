import { TestBed } from '@angular/core/testing';

import { CookieSecureService } from './cookie-secure.service';

describe('CookieSecureService', () => {
  let service: CookieSecureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieSecureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
