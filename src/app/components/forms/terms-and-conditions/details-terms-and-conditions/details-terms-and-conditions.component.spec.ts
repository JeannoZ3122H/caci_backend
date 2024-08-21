import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTermsAndConditionsComponent } from './details-terms-and-conditions.component';

describe('DetailsTermsAndConditionsComponent', () => {
  let component: DetailsTermsAndConditionsComponent;
  let fixture: ComponentFixture<DetailsTermsAndConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsTermsAndConditionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsTermsAndConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
