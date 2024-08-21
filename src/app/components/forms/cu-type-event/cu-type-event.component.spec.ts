import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuTypeEventComponent } from './cu-type-event.component';

describe('CuTypeEventComponent', () => {
  let component: CuTypeEventComponent;
  let fixture: ComponentFixture<CuTypeEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuTypeEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuTypeEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
