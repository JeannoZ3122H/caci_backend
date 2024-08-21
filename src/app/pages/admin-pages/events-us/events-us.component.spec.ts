import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsUsComponent } from './events-us.component';

describe('EventsUsComponent', () => {
  let component: EventsUsComponent;
  let fixture: ComponentFixture<EventsUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
