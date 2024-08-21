import { TestBed } from '@angular/core/testing';

import { TypeEventsService } from './type-events.service';

describe('TypeEventsService', () => {
  let service: TypeEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
