import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediationUsComponent } from './mediation-us.component';

describe('MediationUsComponent', () => {
  let component: MediationUsComponent;
  let fixture: ComponentFixture<MediationUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediationUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediationUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
