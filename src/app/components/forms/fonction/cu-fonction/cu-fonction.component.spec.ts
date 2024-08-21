import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuFonctionComponent } from './cu-fonction.component';

describe('CuFonctionComponent', () => {
  let component: CuFonctionComponent;
  let fixture: ComponentFixture<CuFonctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuFonctionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuFonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
