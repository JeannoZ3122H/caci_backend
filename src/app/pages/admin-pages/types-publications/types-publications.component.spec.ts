import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesPublicationsComponent } from './types-publications.component';

describe('TypesPublicationsComponent', () => {
  let component: TypesPublicationsComponent;
  let fixture: ComponentFixture<TypesPublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypesPublicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypesPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
