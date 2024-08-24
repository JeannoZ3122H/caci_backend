import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationsUsComponent } from './publications-us.component';

describe('PublicationsUsComponent', () => {
  let component: PublicationsUsComponent;
  let fixture: ComponentFixture<PublicationsUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicationsUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicationsUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
