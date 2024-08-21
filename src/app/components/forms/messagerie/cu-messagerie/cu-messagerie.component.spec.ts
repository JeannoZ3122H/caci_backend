import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuMessagerieComponent } from './cu-messagerie.component';

describe('CuMessagerieComponent', () => {
  let component: CuMessagerieComponent;
  let fixture: ComponentFixture<CuMessagerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuMessagerieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuMessagerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
