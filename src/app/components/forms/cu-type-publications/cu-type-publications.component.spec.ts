import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuTypePublicationsComponent } from './cu-type-publications.component';

describe('CuTypePublicationsComponent', () => {
  let component: CuTypePublicationsComponent;
  let fixture: ComponentFixture<CuTypePublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuTypePublicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuTypePublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
