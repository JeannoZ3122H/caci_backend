import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMissionsComponent } from './details-missions.component';

describe('DetailsMissionsComponent', () => {
  let component: DetailsMissionsComponent;
  let fixture: ComponentFixture<DetailsMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsMissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
