import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';

import {
  DeleteSingleItemComponent,
} from '../../../components/dialog/delete-single-item/delete-single-item.component';
import {
  CuTypeEventComponent,
} from '../../../components/forms/cu-type-event/cu-type-event.component';
import { MaterialModule } from '../../../material-module';
import {
  TypeEventsService,
} from '../../../services/request/type-events/type-events.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
    selector: 'app-type-event',
    standalone: true,
    imports: [
        MaterialModule,
        RouterModule,
        NgxPaginationModule
    ],
    templateUrl: './type-event.component.html',
    styleUrl: './type-event.component.css'
})
export class TypeEventComponent implements OnInit, OnDestroy {


    private unscribe = new Subscription();
    public list_type_event: any[] = [];
    p: number =1;
    constructor(
        private __dialog: MatDialog,
        private __message: ToastService,
        private __request: TypeEventsService,
        private _loading: NgxUiLoaderService
    ){}

    ngOnInit(): void {
        this.getListTypeEvent();
    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---get all admin account__ 🍀🍀
    getListTypeEvent(){
        this.unscribe.add(
            this.__request.get().subscribe(
                {
                    next: (resp: any) => {
                        this.list_type_event = resp;
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
        let dialog = this.__dialog.open(DeleteSingleItemComponent,
            {
                panelClass: 'width-delete',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                position:{top: '4%'}
            }
        )
        this.unscribe.add(
            dialog.afterClosed().subscribe(
                {
                    next: (resp: any) => {
                        if (resp == true) {
                            this._loading.start();
                            this.unscribe.add(
                                this.__request.delete(slg).subscribe(
                                    {
                                        next: (resp: any) => {
                                            this._loading.stop();
                                            if (resp.code == 100) {
                                                this.__message.showSuccess(resp);
                                                this.getListTypeEvent();
                                            } else {
                                                this.__message.showError(resp);
                                            }
                                        },
                                        error: (err: any) => {
                                            this._loading.stop();
                                            console.log('error', err)
                                        }
                                    }
                                )
                            );
                        }else{
                            this._loading.stop();
                            this.__message.showWarning({status: "Attention", message: "Votre tentative de suppression vient d'êtres annuler !"});
                        }
                    },
                    error: () => {
                        this._loading.stop();
                        this.__message.showError({ title: 'Attention!', message: "Quelque s'est mal passé." });
                    },
                }
            )
        );
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 END REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//




// __------__ 🍀🍀🍀🍀🍀__---   🍀 START EVENTS 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---__ 🍀🍀 Add New TypeEvent
    addNewTypeEvent(){
        let dialog = this.__dialog.open(CuTypeEventComponent,
            {
                width: 'auto',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: {type: 'add'}
            }
        )
        this.unscribe.add(
            dialog.afterClosed().subscribe(
                {
                    next: (resp: any) => {
                        if(resp == true){
                            this.getListTypeEvent();
                        }
                    },
                    error: () =>{
                        this.__message.showError({title: 'Attention!', message: "Quelque s'est mal passé."});
                    },
                }
            )
        );
    }
    // ---__ 🍀🍀 Add New TypeEvent
    editCurrentTypeEvent(data: any){
        let dialog = this.__dialog.open(CuTypeEventComponent,
            {
                width: 'auto',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: {type: 'edit', content: data}
            }
        )
        this.unscribe.add(
            dialog.afterClosed().subscribe(
                {
                    next: (resp: any) => {
                        if(resp == true){
                            this.getListTypeEvent();
                        }
                    },
                    error: () =>{
                        this.__message.showError({title: 'Attention!', message: "Quelque s'est mal passé."});
                    },
                }
            )
        );
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 END REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    ngOnDestroy(): void {
        this.unscribe.unsubscribe();
    }
}
