import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuSlideUneImgComponent } from './cu-slide-une-img.component';

describe('CuSlideUneImgComponent', () => {
  let component: CuSlideUneImgComponent;
  let fixture: ComponentFixture<CuSlideUneImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuSlideUneImgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuSlideUneImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
