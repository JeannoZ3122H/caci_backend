import { DatePipe } from '@angular/common';
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
  CuSlideUneImgComponent,
} from '../../../../components/forms/welcome-content/cu-slide-une-img/cu-slide-une-img.component';
import { MaterialModule } from '../../../../material-module';
import {
  SlideUneImgService,
} from '../../../../services/request/slide-une-img/slide-une-img.service';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
    selector: 'app-slide-une-img',
    standalone: true,
    imports: [
        MaterialModule,
        RouterModule,
        NgxPaginationModule,
        DatePipe
    ],
    templateUrl: './slide-une-img.component.html',
    styleUrl: './slide-une-img.component.css'
})
export class SlideUneImgComponent implements OnInit, OnDestroy {

    private unscribe = new Subscription();
    public list_slide_une: any[] = [];
    p: number = 1;
    constructor(
        private __dialog: MatDialog,
        private __message: ToastService,
        private __request: SlideUneImgService,
        private _loading: NgxUiLoaderService
    ) { }

    ngOnInit(): void {
        this.getListSlideUneImg();
    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---get all admin account__ 🍀🍀
    getListSlideUneImg() {
        this.unscribe.add(
            this.__request.get().subscribe(
                {
                    next: (resp: any) => {
                        this.list_slide_une = resp;
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
                                                this.getListSlideUneImg();
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

    // ---__ 🍀🍀
    addNewItem() {
        let dialog = this.__dialog.open(CuSlideUneImgComponent,
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
                            this.getListSlideUneImg();
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
        let dialog = this.__dialog.open(CuSlideUneImgComponent,
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
                            this.getListSlideUneImg();
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
