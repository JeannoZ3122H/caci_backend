import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMeComponent } from './register-me.component';

describe('RegisterMeComponent', () => {
  let component: RegisterMeComponent;
  let fixture: ComponentFixture<RegisterMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterMeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
