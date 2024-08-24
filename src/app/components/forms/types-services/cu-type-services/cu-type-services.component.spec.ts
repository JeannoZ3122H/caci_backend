import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuTypeServicesComponent } from './cu-type-services.component';

describe('CuTypeServicesComponent', () => {
  let component: CuTypeServicesComponent;
  let fixture: ComponentFixture<CuTypeServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuTypeServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuTypeServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
