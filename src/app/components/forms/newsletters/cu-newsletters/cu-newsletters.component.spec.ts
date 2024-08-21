import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuNewslettersComponent } from './cu-newsletters.component';

describe('CuNewslettersComponent', () => {
  let component: CuNewslettersComponent;
  let fixture: ComponentFixture<CuNewslettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuNewslettersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuNewslettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
