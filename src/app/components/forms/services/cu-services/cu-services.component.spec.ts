import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuServicesComponent } from './cu-services.component';

describe('CuServicesComponent', () => {
  let component: CuServicesComponent;
  let fixture: ComponentFixture<CuServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
