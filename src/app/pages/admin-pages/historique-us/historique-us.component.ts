import { DatePipe } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription } from 'rxjs';

import { MaterialModule } from '../../../material-module';
import {
  HistoriqueService,
} from '../../../services/request/historique/historique.service';

@Component({
    selector: 'app-historique-us',
    standalone: true,
    imports: [
        MaterialModule,
        RouterModule,
        NgxPaginationModule,
        DatePipe
    ],
    templateUrl: './historique-us.component.html',
    styleUrl: './historique-us.component.css'
})
export class HistoriqueUsComponent implements OnInit, OnDestroy {

    private unscribe = new Subscription();
    public list: any[] = [];
    p: number = 1;
    constructor(
        private __request: HistoriqueService
    ) { }

    ngOnInit(): void {
        this.getList();
    }

    // __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---get all admin account__ 🍀🍀
    getList() {
        this.unscribe.add(
            this.__request.get().subscribe(
                {
                    next: (resp: any) => {
                        console.log('resp', resp)
                        this.list = resp;
                    },
                    error: (err: any) => {
                        console.log('error', err)
                    }
                }
            )
        )
    }


    // __------__ 🍀🍀🍀🍀🍀__---   🍀 END REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//




    // __------__ 🍀🍀🍀🍀🍀__---   🍀 START EVENTS 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // __------__ 🍀🍀🍀🍀🍀__---   🍀 END REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    ngOnDestroy(): void {
        this.unscribe.unsubscribe();
    }
}
