import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuTermsAndConditionsComponent } from './cu-terms-and-conditions.component';

describe('CuTermsAndConditionsComponent', () => {
  let component: CuTermsAndConditionsComponent;
  let fixture: ComponentFixture<CuTermsAndConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuTermsAndConditionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuTermsAndConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
