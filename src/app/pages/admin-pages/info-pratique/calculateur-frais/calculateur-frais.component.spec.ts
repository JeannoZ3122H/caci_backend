import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateurFraisComponent } from './calculateur-frais.component';

describe('CalculateurFraisComponent', () => {
  let component: CalculateurFraisComponent;
  let fixture: ComponentFixture<CalculateurFraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculateurFraisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculateurFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
