import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTestimonialComponent } from './details-testimonial.component';

describe('DetailsTestimonialComponent', () => {
  let component: DetailsTestimonialComponent;
  let fixture: ComponentFixture<DetailsTestimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsTestimonialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
