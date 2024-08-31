import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevenirArbitreComponent } from './devenir-arbitre.component';

describe('DevenirArbitreComponent', () => {
  let component: DevenirArbitreComponent;
  let fixture: ComponentFixture<DevenirArbitreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevenirArbitreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevenirArbitreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
