import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuPartnersComponent } from './cu-partners.component';

describe('CuPartnersComponent', () => {
  let component: CuPartnersComponent;
  let fixture: ComponentFixture<CuPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuPartnersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
