import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMessagerieComponent } from './details-messagerie.component';

describe('DetailsMessagerieComponent', () => {
  let component: DetailsMessagerieComponent;
  let fixture: ComponentFixture<DetailsMessagerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsMessagerieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsMessagerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
