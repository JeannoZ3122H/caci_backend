import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuArbitrageComponent } from './cu-arbitrage.component';

describe('CuArbitrageComponent', () => {
  let component: CuArbitrageComponent;
  let fixture: ComponentFixture<CuArbitrageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuArbitrageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuArbitrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
