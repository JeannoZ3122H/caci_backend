import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsUsComponent } from './teams-us.component';

describe('TeamsUsComponent', () => {
  let component: TeamsUsComponent;
  let fixture: ComponentFixture<TeamsUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamsUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamsUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
