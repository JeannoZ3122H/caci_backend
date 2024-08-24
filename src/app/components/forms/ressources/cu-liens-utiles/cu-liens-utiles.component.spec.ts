import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuLiensUtilesComponent } from './cu-liens-utiles.component';

describe('CuLiensUtilesComponent', () => {
  let component: CuLiensUtilesComponent;
  let fixture: ComponentFixture<CuLiensUtilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuLiensUtilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuLiensUtilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
