import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuAgendasComponent } from './cu-agendas.component';

describe('CuAgendasComponent', () => {
  let component: CuAgendasComponent;
  let fixture: ComponentFixture<CuAgendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuAgendasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuAgendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
