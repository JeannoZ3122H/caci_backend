import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMediationComponent } from './details-mediation.component';

describe('DetailsMediationComponent', () => {
  let component: DetailsMediationComponent;
  let fixture: ComponentFixture<DetailsMediationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsMediationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsMediationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
