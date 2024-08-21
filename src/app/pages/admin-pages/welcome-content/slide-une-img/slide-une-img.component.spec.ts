import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideUneImgComponent } from './slide-une-img.component';

describe('SlideUneImgComponent', () => {
  let component: SlideUneImgComponent;
  let fixture: ComponentFixture<SlideUneImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideUneImgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlideUneImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
