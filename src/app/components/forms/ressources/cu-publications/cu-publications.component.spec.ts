import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuPublicationsComponent } from './cu-publications.component';

describe('CuPublicationsComponent', () => {
  let component: CuPublicationsComponent;
  let fixture: ComponentFixture<CuPublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuPublicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
