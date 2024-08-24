import { TestBed } from '@angular/core/testing';

import { TraitmentsService } from './traitments.service';

describe('TraitmentsService', () => {
  let service: TraitmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraitmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
