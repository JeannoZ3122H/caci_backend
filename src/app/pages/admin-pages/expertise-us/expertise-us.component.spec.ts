import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiseUsComponent } from './expertise-us.component';

describe('ExpertiseUsComponent', () => {
  let component: ExpertiseUsComponent;
  let fixture: ComponentFixture<ExpertiseUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertiseUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpertiseUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
