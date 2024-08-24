import { TestBed } from '@angular/core/testing';

import { TypeServicesService } from './type-services.service';

describe('TypeServicesService', () => {
  let service: TypeServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
