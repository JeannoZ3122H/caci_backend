import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTypeServicesComponent } from './details-type-services.component';

describe('DetailsTypeServicesComponent', () => {
  let component: DetailsTypeServicesComponent;
  let fixture: ComponentFixture<DetailsTypeServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsTypeServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsTypeServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
