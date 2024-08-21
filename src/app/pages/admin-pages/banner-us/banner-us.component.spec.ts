import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerUsComponent } from './banner-us.component';

describe('BannerUsComponent', () => {
  let component: BannerUsComponent;
  let fixture: ComponentFixture<BannerUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
