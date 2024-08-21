import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTeamsComponent } from './details-teams.component';

describe('DetailsTeamsComponent', () => {
  let component: DetailsTeamsComponent;
  let fixture: ComponentFixture<DetailsTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsTeamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
