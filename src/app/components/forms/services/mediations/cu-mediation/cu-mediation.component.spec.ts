import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuMediationComponent } from './cu-mediation.component';

describe('CuMediationComponent', () => {
  let component: CuMediationComponent;
  let fixture: ComponentFixture<CuMediationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuMediationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuMediationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
