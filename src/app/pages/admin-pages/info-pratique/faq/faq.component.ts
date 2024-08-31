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
} from '../../../../components/dialog/delete-single-item/delete-single-item.component';
import {
  CuInfoPratiqueComponent,
} from '../../../../components/forms/info-pratique/cu-info-pratique/cu-info-pratique.component';
import { MaterialModule } from '../../../../material-module';
import { AuthService } from '../../../../services/auth/auth.service';
import {
  InfoPratiqueService,
} from '../../../../services/request/info-pratique/info-pratique.service';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
    selector: 'app-faq',
    standalone: true,
    imports: [
        MaterialModule,
        RouterModule,
        NgxPaginationModule
    ],
    templateUrl: './faq.component.html',
    styleUrl: './faq.component.css'
})
export class FaqComponent implements OnInit, OnDestroy {

    private unscribe = new Subscription();
    public list_faq: any[] = [];
    p: number = 1;
    constructor(
        private __dialog: MatDialog,
        private __message: ToastService,
        private __request: InfoPratiqueService,
        private _loading: NgxUiLoaderService,
        private __auth: AuthService
    ) { }

    ngOnInit(): void {
        this.getList();
    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//
    // --- Get list ---🍀🍀
    getList() {
        this.unscribe.add(
            this.__request.getFaq().subscribe(
                {
                    next: (resp: any) => {
                        this.list_faq = resp;
                    },
                    error: (err: any) => {
                        if (err.status == 401) {
                            this.__auth.autoLogOut();
                        }
                    }
                }
            )
        )
    }
    // --- Delete Current Item__ 🍀🍀
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
                                this.__request.deleteFaq(slg).subscribe(
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
                                            console.log('error', err)
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
    // ---__ 🍀🍀 Edit
    edit(data: any) {
        let dialog = this.__dialog.open(CuInfoPratiqueComponent,
            {
                width: '80%',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: { type: 'edit', content: data, element: 'faq', title: 'Faq' }
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
