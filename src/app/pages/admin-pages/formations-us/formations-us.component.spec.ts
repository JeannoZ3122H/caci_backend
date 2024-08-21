import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationsUsComponent } from './formations-us.component';

describe('FormationsUsComponent', () => {
  let component: FormationsUsComponent;
  let fixture: ComponentFixture<FormationsUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationsUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormationsUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
