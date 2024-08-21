import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
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
  CuPartnersComponent,
} from '../../../components/forms/partners/cu-partners/cu-partners.component';
import { MaterialModule } from '../../../material-module';
import {
  PartnersService,
} from '../../../services/request/admin/partners/partners.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
    selector: 'app-partners-us',
    standalone: true,
    imports: [
        MaterialModule,
        RouterModule,
        NgxPaginationModule
    ],
    templateUrl: './partners-us.component.html',
    styleUrl: './partners-us.component.css'
})
export class PartnersUsComponent implements OnInit, OnDestroy {

    private unscribe = new Subscription();
    public list_partners: any[] = [];
    p: number = 1;

    constructor(
        private __dialog: MatDialog,
        private __message: ToastService,
        private __request: PartnersService,
        @Inject(DOCUMENT) private _document: Document,
        private _loading: NgxUiLoaderService
    ) { }

    ngOnInit(): void {
        this.getListPartners();
    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---get all __ 🍀🍀
    getListPartners() {
        this.unscribe.add(
            this.__request.get().subscribe(
                {
                    next: (resp: any) => {
                        if(resp){
                            this.list_partners = resp;
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
                                            if (resp.code == 100) {
                                                this.__message.showSuccess(resp);
                                                this.getListPartners();
                                            } else {
                                                this.__message.showError(resp);
                                            }
                                        },
                                        error: (err: any) => {
                                            console.log('error', err)
                                        }
                                    }
                                )
                            );
                        }else{
                            this.__message.showWarning({status: "Attention", message: "Votre tentative de suppression vient d'êtres annuler !"});
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


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START EVENTS 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---__ 🍀🍀
    addNewItem() {
        let dialog = this.__dialog.open(CuPartnersComponent,
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
                            this.getListPartners();
                        }
                    },
                    error: () => {
                        this.__message.showError({ title: 'Attention!', message: "Quelque s'est mal passé." });
                    },
                }
            )
        );
    }
    // ---__ 🍀🍀 Add New
    editCurrentItem(data: any) {
        let dialog = this.__dialog.open(CuPartnersComponent,
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
                            this.getListPartners();
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
    // 
    goTo(url: any){
        if(url){
            let _window = this._document.defaultView?.window;
            _window?.open(url, '_blank');
        }
    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 END EVENTS 🍀   ---__ 🍀🍀🍀🍀🍀__------__//


    ngOnDestroy(): void {
        this.unscribe.unsubscribe();
    }
}
