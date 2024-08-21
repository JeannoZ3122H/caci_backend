import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuExpertiseComponent } from './cu-expertise.component';

describe('CuExpertiseComponent', () => {
  let component: CuExpertiseComponent;
  let fixture: ComponentFixture<CuExpertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuExpertiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuExpertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
