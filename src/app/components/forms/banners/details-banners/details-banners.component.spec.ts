import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBannersComponent } from './details-banners.component';

describe('DetailsBannersComponent', () => {
  let component: DetailsBannersComponent;
  let fixture: ComponentFixture<DetailsBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsBannersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
