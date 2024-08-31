import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuInfoPratiqueComponent } from './cu-info-pratique.component';

describe('CuInfoPratiqueComponent', () => {
  let component: CuInfoPratiqueComponent;
  let fixture: ComponentFixture<CuInfoPratiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuInfoPratiqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuInfoPratiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
