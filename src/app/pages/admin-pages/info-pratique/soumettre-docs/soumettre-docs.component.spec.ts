import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoumettreDocsComponent } from './soumettre-docs.component';

describe('SoumettreDocsComponent', () => {
  let component: SoumettreDocsComponent;
  let fixture: ComponentFixture<SoumettreDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoumettreDocsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoumettreDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
