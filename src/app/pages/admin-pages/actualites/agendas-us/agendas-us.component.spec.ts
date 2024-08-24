import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendasUsComponent } from './agendas-us.component';

describe('AgendasUsComponent', () => {
  let component: AgendasUsComponent;
  let fixture: ComponentFixture<AgendasUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendasUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgendasUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
