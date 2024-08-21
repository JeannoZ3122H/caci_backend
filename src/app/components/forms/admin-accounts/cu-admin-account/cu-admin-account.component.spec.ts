import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { beforeEach } from 'node:test';

import { CuAdminAccountComponent } from './cu-admin-account.component';

describe('CuAdminAccountComponent', () => {
    let component: CuAdminAccountComponent;
    let fixture: ComponentFixture<CuAdminAccountComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CuAdminAccountComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CuAdminAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
