import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OoopsComponent } from './ooops.component';

describe('OoopsComponent', () => {
  let component: OoopsComponent;
  let fixture: ComponentFixture<OoopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OoopsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OoopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
