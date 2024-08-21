import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuTeamsComponent } from './cu-teams.component';

describe('CuTeamsComponent', () => {
  let component: CuTeamsComponent;
  let fixture: ComponentFixture<CuTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuTeamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
