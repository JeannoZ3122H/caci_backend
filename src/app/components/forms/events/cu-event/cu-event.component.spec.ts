import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { CuEventComponent } from './cu-event.component';

describe('CuEventComponent', () => {
    let component: CuEventComponent;
    let fixture: ComponentFixture<CuEventComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CuEventComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CuEventComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
