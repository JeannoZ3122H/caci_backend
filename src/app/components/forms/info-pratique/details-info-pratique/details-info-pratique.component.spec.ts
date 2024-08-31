import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsInfoPratiqueComponent } from './details-info-pratique.component';

describe('DetailsInfoPratiqueComponent', () => {
  let component: DetailsInfoPratiqueComponent;
  let fixture: ComponentFixture<DetailsInfoPratiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsInfoPratiqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsInfoPratiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
