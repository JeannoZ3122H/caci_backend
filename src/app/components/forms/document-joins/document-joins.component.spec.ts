import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentJoinsComponent } from './document-joins.component';

describe('DocumentJoinsComponent', () => {
  let component: DocumentJoinsComponent;
  let fixture: ComponentFixture<DocumentJoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentJoinsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentJoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
