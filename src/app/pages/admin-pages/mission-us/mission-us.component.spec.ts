import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionUsComponent } from './mission-us.component';

describe('MissionUsComponent', () => {
  let component: MissionUsComponent;
  let fixture: ComponentFixture<MissionUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MissionUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
