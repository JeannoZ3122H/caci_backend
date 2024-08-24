import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuMissionComponent } from './cu-mission.component';

describe('CuMissionComponent', () => {
  let component: CuMissionComponent;
  let fixture: ComponentFixture<CuMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuMissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
