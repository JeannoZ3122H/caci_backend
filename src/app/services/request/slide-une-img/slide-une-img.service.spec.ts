import { TestBed } from '@angular/core/testing';

import { SlideUneImgService } from './slide-une-img.service';

describe('SlideUneImgService', () => {
  let service: SlideUneImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlideUneImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
