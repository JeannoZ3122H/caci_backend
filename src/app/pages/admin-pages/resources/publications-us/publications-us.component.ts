import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';

import {
  DeleteSingleItemComponent,
} from '../../../../components/dialog/delete-single-item/delete-single-item.component';
import {
  CuPublicationsComponent,
} from '../../../../components/forms/ressources/cu-publications/cu-publications.component';
import {
  DetailsPublicationsComponent,
} from '../../../../components/forms/ressources/details-publications/details-publications.component';
import { MaterialModule } from '../../../../material-module';
import { AuthService } from '../../../../services/auth/auth.service';
import {
  RessourcesService,
} from '../../../../services/request/ressources/ressources.service';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
    selector: 'app-publications-us',
    standalone: true,
    imports: [
        MaterialModule,
        RouterModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule
    ],
    templateUrl: './publications-us.component.html',
    styleUrl: './publications-us.component.css'
})
export class PublicationsUsComponent implements OnInit, OnDestroy {


    private unscribe = new Subscription();
    public list_publications: any[] = [];
    p: number = 1;
    is_copy_link: boolean = false;
    constructor(
        private __dialog: MatDialog,
        private __message: ToastService,
        private __request: RessourcesService,
        private __loading: NgxUiLoaderService,
        private _snackBar: MatSnackBar,
        private _auth: AuthService
    ) { }

    ngOnInit(): void {
        this.getList();
    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---get all __ 🍀🍀
    getList() {
        this.unscribe.add(
            this.__request.getPublication().subscribe(
                {
                    next: (resp: any) => {
                        this.list_publications = resp;
                    },
                    error: (err: any) => {
                        this.__loading.stop();
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
                                this.__request.deletePublication(slg).subscribe(
                                    {
                                        next: (resp: any) => {
                                            if (resp.code == 100) {
                                                this.__loading.stop();
                                                this.__message.showSuccess(resp);
                                                setTimeout(() => {
                                                    this.getList();
                                                }, 1000);
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

    copyLink(){
        this._snackBar.open("Lien copié !", "Succèss");
        this.is_copy_link =! this.is_copy_link;
        setTimeout(() => {
            this.is_copy_link =! this.is_copy_link;
        }, 3000);
    }
    // ---__ 🍀🍀 Add
    add() {
        let dialog = this.__dialog.open(CuPublicationsComponent,
            {
                width: '70%',
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
                            setTimeout(() => {
                                this.getList();
                            }, 1000);
                        }
                    },
                    error: () => {
                        this.__message.showError({ title: 'Attention!', message: "Quelque s'est mal passé." });
                    },
                }
            )
        );
    }
    // ---__ 🍀🍀 Edit
    edit(data: any) {
        let dialog = this.__dialog.open(CuPublicationsComponent,
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
                            setTimeout(() => {
                                this.getList();
                            }, 1000);
                        }
                    },
                    error: () => {
                        this.__message.showError({ title: 'Attention!', message: "Quelque s'est mal passé." });
                    },
                }
            )
        );
    }
    // ---__ 🍀🍀 Details
    showDetails(data: any) {
        let dialog = this.__dialog.open(DetailsPublicationsComponent,
            {
                width: 'auto',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: { type: 'publication', content: data }
            }
        )
        this.unscribe.add(
            dialog.afterClosed().subscribe(
                {
                    next: (resp: any) => {
                        if (resp == true) {
                            setTimeout(() => {
                                this.getList();
                            }, 1000);
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
