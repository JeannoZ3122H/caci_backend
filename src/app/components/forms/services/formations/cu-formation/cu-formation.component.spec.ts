import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuFormationComponent } from './cu-formation.component';

describe('CuFormationComponent', () => {
  let component: CuFormationComponent;
  let fixture: ComponentFixture<CuFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuFormationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
