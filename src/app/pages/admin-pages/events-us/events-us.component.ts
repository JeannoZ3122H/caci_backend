import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import {
  CarouselModule,
  OwlOptions,
} from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription } from 'rxjs';

import {
  CuEventComponent,
} from '../../../components/forms/events/cu-event/cu-event.component';
import {
  DetailEventComponent,
} from '../../../components/forms/events/detail-event/detail-event.component';
import { MaterialModule } from '../../../material-module';
import {
  EventService,
} from '../../../services/request/admin/event/event.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
    selector: 'app-events-us',
    standalone: true,
    imports: [
        MaterialModule,
        RouterModule,
        NgxPaginationModule,
        CarouselModule
    ],
    templateUrl: './events-us.component.html',
    styleUrl: './events-us.component.css'
})
export class EventsUsComponent implements OnInit, OnDestroy {

    private unscribe = new Subscription();
    public list_events: any[] = [];
    public list_events_news: any[] = [];
    p: number = 1;

    customOptions: OwlOptions = {
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1
            },
        },
        nav: true
    }
    constructor(
        private __dialog: MatDialog,
        private __message: ToastService,
        private __request: EventService
    ) { }

    ngOnInit(): void {
        this.getListEvents();
    }

    // __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---get all admin account__ 🍀🍀
    getListEvents() {
        this.unscribe.add(
            this.__request.get().subscribe(
                {
                    next: (resp: any) => {
                        if(resp){
                            resp.forEach((el: any) => {
                                // el.event_img = JSON.parse(el.event_img);
                                if(el.event_img != null){
                                    Object.assign(el, {list_img: JSON.parse(el.event_img)});
                                }
                            });
                            this.list_events_news = resp;
                        }
                    },
                    error: (err: any) => {
                        console.log('error', err)
                    }
                }
            )
        )
    }
    // ---delete current item__ 🍀🍀
    delete(slg: any) {
        this.unscribe.add(
            this.__request.delete(slg).subscribe(
                {
                    next: (resp: any) => {
                        if (resp.code == 100) {
                            this.__message.showSuccess(resp);
                        } else {
                            this.__message.showError(resp);
                        }
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

    // ---__ 🍀🍀
    addNewItem() {
        let dialog = this.__dialog.open(CuEventComponent,
            {
                panelClass: 'fullscreen-dialog',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: { type: 'add' }
            }
        )
        this.unscribe.add(
            dialog.afterClosed().subscribe(
                {
                    next: (resp: any) => {
                        if (resp == true) {
                            this.getListEvents();
                        }
                    },
                    error: () => {
                        this.__message.showError({ title: 'Attention!', message: "Quelque s'est mal passé." });
                    },
                }
            )
        );
    }
    // ---__ 🍀🍀 Add New Role
    editCurrentItem(data: any) {
        let dialog = this.__dialog.open(CuEventComponent,
            {
                panelClass: 'fullscreen-dialog',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: { type: 'edit', content: data }
            }
        )
        this.unscribe.add(
            dialog.afterClosed().subscribe(
                {
                    next: (resp: any) => {
                        if (resp == true) {
                            this.getListEvents();
                        }
                    },
                    error: () => {
                        this.__message.showError({ title: 'Attention!', message: "Quelque s'est mal passé." });
                    },
                }
            )
        );
    }
    // ---__ 🍀🍀 Add New Role
    showDetails(data: any) {
        let dialog = this.__dialog.open(DetailEventComponent,
            {
                panelClass: 'fullscreen-dialog',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: { type: 'details', content: data }
            }
        )
        this.unscribe.add(
            dialog.afterClosed().subscribe(
                {
                    next: (resp: any) => {
                        if (resp == true) {
                            this.getListEvents();
                        }
                    },
                    error: () => {
                        this.__message.showError({ title: 'Attention!', message: "Quelque s'est mal passé." });
                    },
                }
            )
        );
    }
    // ---__ 🍀🍀
    userImg(user_img: any): String {
        return `max-width: 400px;
        background-image: url(${user_img});
        background-size: cover;`
    }


    // __------__ 🍀🍀🍀🍀🍀__---   🍀 END EVENTS 🍀   ---__ 🍀🍀🍀🍀🍀__------__//


    ngOnDestroy(): void {
        this.unscribe.unsubscribe();
    }
}
