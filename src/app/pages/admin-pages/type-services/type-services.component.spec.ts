import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeServicesComponent } from './type-services.component';

describe('TypeServicesComponent', () => {
  let component: TypeServicesComponent;
  let fixture: ComponentFixture<TypeServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
