import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuBannersComponent } from './cu-banners.component';

describe('CuBannersComponent', () => {
  let component: CuBannersComponent;
  let fixture: ComponentFixture<CuBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuBannersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
