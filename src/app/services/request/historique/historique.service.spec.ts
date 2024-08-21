import { TestBed } from '@angular/core/testing';

import { beforeEach } from 'node:test';

import { HistoriqueService } from './historique.service';

describe('HistoriqueService', () => {
    let service: HistoriqueService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(HistoriqueService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
