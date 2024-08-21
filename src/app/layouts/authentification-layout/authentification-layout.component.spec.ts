import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthentificationLayoutComponent } from './authentification-layout.component';

describe('AuthentificationLayoutComponent', () => {
  let component: AuthentificationLayoutComponent;
  let fixture: ComponentFixture<AuthentificationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthentificationLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthentificationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
