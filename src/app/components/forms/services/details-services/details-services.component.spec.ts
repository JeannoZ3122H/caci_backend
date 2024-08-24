import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsServicesComponent } from './details-services.component';

describe('DetailsServicesComponent', () => {
  let component: DetailsServicesComponent;
  let fixture: ComponentFixture<DetailsServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
