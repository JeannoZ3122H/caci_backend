import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationUsComponent } from './organization-us.component';

describe('OrganizationUsComponent', () => {
  let component: OrganizationUsComponent;
  let fixture: ComponentFixture<OrganizationUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
