import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOrganisationComponent } from './details-organisation.component';

describe('DetailsOrganisationComponent', () => {
  let component: DetailsOrganisationComponent;
  let fixture: ComponentFixture<DetailsOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsOrganisationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
