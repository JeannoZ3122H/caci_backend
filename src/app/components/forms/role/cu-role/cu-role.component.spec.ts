import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuRoleComponent } from './cu-role.component';

describe('CuRoleComponent', () => {
  let component: CuRoleComponent;
  let fixture: ComponentFixture<CuRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
