import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsArbitrageComponent } from './details-arbitrage.component';

describe('DetailsArbitrageComponent', () => {
  let component: DetailsArbitrageComponent;
  let fixture: ComponentFixture<DetailsArbitrageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsArbitrageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsArbitrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
