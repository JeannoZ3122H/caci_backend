import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSingleItemComponent } from './delete-single-item.component';

describe('DeleteSingleItemComponent', () => {
  let component: DeleteSingleItemComponent;
  let fixture: ComponentFixture<DeleteSingleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSingleItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteSingleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
