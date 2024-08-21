import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UTestimonialComponent } from './u-testimonial.component';

describe('UTestimonialComponent', () => {
  let component: UTestimonialComponent;
  let fixture: ComponentFixture<UTestimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UTestimonialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
