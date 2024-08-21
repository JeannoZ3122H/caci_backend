import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsExpertiseComponent } from './details-expertise.component';

describe('DetailsExpertiseComponent', () => {
  let component: DetailsExpertiseComponent;
  let fixture: ComponentFixture<DetailsExpertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsExpertiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsExpertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
