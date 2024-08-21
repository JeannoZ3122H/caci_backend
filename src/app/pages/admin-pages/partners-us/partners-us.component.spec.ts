import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersUsComponent } from './partners-us.component';

describe('PartnersUsComponent', () => {
  let component: PartnersUsComponent;
  let fixture: ComponentFixture<PartnersUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnersUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnersUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
