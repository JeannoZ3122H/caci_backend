import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuOrganisationComponent } from './cu-organisation.component';

describe('CuOrganisationComponent', () => {
  let component: CuOrganisationComponent;
  let fixture: ComponentFixture<CuOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuOrganisationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
