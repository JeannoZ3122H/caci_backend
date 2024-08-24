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
  CuTypeServicesComponent,
} from '../../../components/forms/types-services/cu-type-services/cu-type-services.component';
import { MaterialModule } from '../../../material-module';
import { AuthService } from '../../../services/auth/auth.service';
import {
  TypeServicesService,
} from '../../../services/request/type-services/type-services.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
    selector: 'app-type-services',
    standalone: true,
    imports: [
        MaterialModule,
        RouterModule,
        NgxPaginationModule
    ],
    templateUrl: './type-services.component.html',
    styleUrl: './type-services.component.css'
})
export class TypeServicesComponent implements OnInit, OnDestroy {


    private unscribe = new Subscription();
    public list_type_service: any[] = [];
    p: number = 1;
    constructor(
        private __dialog: MatDialog,
        private __message: ToastService,
        private __request: TypeServicesService,
        private _loading: NgxUiLoaderService,
        private _auth: AuthService
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
                        this.list_type_service = resp;
                    },
                    error: (err: any) => {
                        if(err.status == 401){
                            this._auth.autoLogOut();
                        }
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
                position: { top: '4%' }
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
                                                this.getList();
                                            } else {
                                                this.__message.showError(resp);
                                            }
                                        },
                                        error: (err: any) => {
                                            this._loading.stop();
                                            if(err.status == 401){
                                                this._auth.autoLogOut();
                                            }
                                        }
                                    }
                                )
                            );
                        } else {
                            this._loading.stop();
                            this.__message.showWarning({ status: "Attention", message: "Votre tentative de suppression vient d'êtres annuler !" });
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
    add() {
        let dialog = this.__dialog.open(CuTypeServicesComponent,
            {
                width: 'auto',
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
                            this.getList();
                        }
                    },
                    error: () => {
                        this.__message.showError({ title: 'Attention!', message: "Quelque s'est mal passé." });
                    },
                }
            )
        );
    }
    // ---__ 🍀🍀 Add New TypeEvent
    edit(data: any) {
        let dialog = this.__dialog.open(CuTypeServicesComponent,
            {
                width: 'auto',
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
                            this.getList();
                        }
                    },
                    error: () => {
                        this.__message.showError({ title: 'Attention!', message: "Quelque s'est mal passé." });
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
