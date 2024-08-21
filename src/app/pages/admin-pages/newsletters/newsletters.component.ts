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
  CuNewslettersComponent,
} from '../../../components/forms/newsletters/cu-newsletters/cu-newsletters.component';
import { MaterialModule } from '../../../material-module';
import {
  NewslettersService,
} from '../../../services/request/admin/newsletters/newsletters.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
    selector: 'app-newsletters',
    standalone: true,
    imports: [
        MaterialModule,
        RouterModule,
        NgxPaginationModule
    ],
    templateUrl: './newsletters.component.html',
    styleUrl: './newsletters.component.css'
})
export class NewslettersComponent implements OnInit, OnDestroy {


    private unscribe = new Subscription();
    public list_newsletters: any[] = [];
    p: number = 1;
    constructor(
        private __dialog: MatDialog,
        private __message: ToastService,
        private __request: NewslettersService,
        private __loading: NgxUiLoaderService
    ) { }

    ngOnInit(): void {
        this.getListNewsLetters();
    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---get all admin account__ 🍀🍀
    getListNewsLetters() {
        this.unscribe.add(
            this.__request.get().subscribe(
                {
                    next: (resp: any) => {
                        this.list_newsletters = resp;
                    },
                    error: (err: any) => {
                        this.__loading.stop();
                        console.log('server', err)
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
                            this.__loading.start();
                            this.unscribe.add(
                                this.__request.delete(slg).subscribe(
                                    {
                                        next: (resp: any) => {
                                            if (resp.code == 100) {
                                                this.__loading.stop();
                                                this.__message.showSuccess(resp);
                                            } else {
                                                this.__loading.stop();
                                                this.__message.showError(resp);
                                            }
                                        },
                                        error: (err: any) => {
                                            this.__loading.stop();
                                            console.log('server', err)
                                        }
                                    }
                                )
                            )
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

    // ---__ 🍀🍀 Add New NewsLetters
    editCurrentNewsLetters(data: any) {
        let dialog = this.__dialog.open(CuNewslettersComponent,
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
                            this.getListNewsLetters();
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

