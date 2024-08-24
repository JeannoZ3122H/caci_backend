import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiensUtilesUsComponent } from './liens-utiles-us.component';

describe('LiensUtilesUsComponent', () => {
  let component: LiensUtilesUsComponent;
  let fixture: ComponentFixture<LiensUtilesUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiensUtilesUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiensUtilesUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
