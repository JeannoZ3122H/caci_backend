import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitrageUsComponent } from './arbitrage-us.component';

describe('ArbitrageUsComponent', () => {
  let component: ArbitrageUsComponent;
  let fixture: ComponentFixture<ArbitrageUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbitrageUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArbitrageUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
