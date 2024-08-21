import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeSliderUsComponent } from './welcome-slider-us.component';

describe('WelcomeSliderUsComponent', () => {
  let component: WelcomeSliderUsComponent;
  let fixture: ComponentFixture<WelcomeSliderUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeSliderUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WelcomeSliderUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
