import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueUsComponent } from './historique-us.component';

describe('HistoriqueUsComponent', () => {
  let component: HistoriqueUsComponent;
  let fixture: ComponentFixture<HistoriqueUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoriqueUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
