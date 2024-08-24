import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuHistoriqueComponent } from './cu-historique.component';

describe('CuHistoriqueComponent', () => {
  let component: CuHistoriqueComponent;
  let fixture: ComponentFixture<CuHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuHistoriqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
