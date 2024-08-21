import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAdminAccountComponent } from './details-admin-account.component';

describe('DetailsAdminAccountComponent', () => {
  let component: DetailsAdminAccountComponent;
  let fixture: ComponentFixture<DetailsAdminAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsAdminAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsAdminAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
