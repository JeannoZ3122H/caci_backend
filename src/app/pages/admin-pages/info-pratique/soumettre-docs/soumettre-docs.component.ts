import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription } from 'rxjs';

import {
  DocumentJoinsComponent,
} from '../../../../components/forms/document-joins/document-joins.component';
import {
  CuInfoPratiqueComponent,
} from '../../../../components/forms/info-pratique/cu-info-pratique/cu-info-pratique.component';
import {
  DetailsInfoPratiqueComponent,
} from '../../../../components/forms/info-pratique/details-info-pratique/details-info-pratique.component';
import { MaterialModule } from '../../../../material-module';
import { AuthService } from '../../../../services/auth/auth.service';
import {
  InfoPratiqueService,
} from '../../../../services/request/info-pratique/info-pratique.service';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
    selector: 'app-soumettre-docs',
    standalone: true,
    imports: [
        MaterialModule,
        RouterModule,
        NgxPaginationModule
    ],
    templateUrl: './soumettre-docs.component.html',
    styleUrl: './soumettre-docs.component.css'
})
export class SoumettreDocsComponent implements OnInit, OnDestroy {
    private unscribe = new Subscription();
    public list_soumettre: any[] = [];
    p: number = 1;
    constructor(
        private __dialog: MatDialog,
        private __message: ToastService,
        private __request: InfoPratiqueService,
        private __auth: AuthService
    ) { }

    ngOnInit(): void {
        // this.joinDocument('add');
        this.getList();
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//
    // ---get all admin account__ 🍀🍀
    getList() {
        this.unscribe.add(
            this.__request.get().subscribe(
                {
                    next: (resp: any) => {
                        if (resp) {
                            // console.log(resp)
                            this.list_soumettre = resp;
                        }
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
    // ---delete current item__ 🍀🍀
    delete(slg: any) {
        this.unscribe.add(
            this.__request.delete(slg).subscribe(
                {
                    next: (resp: any) => {
                        if (resp.code == 100) {
                            this.__message.showSuccess(resp);
                            setTimeout(() => {
                                this.getList();
                            }, 500);
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
        let dialog = this.__dialog.open(CuInfoPratiqueComponent,
            {
                panelClass: 'fullscreen-dialog',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: { type: 'add', element: 'soumettre-doc', title: 'comment soumettre un dossier' }
            }
        )
        this.unscribe.add(
            dialog.afterClosed().subscribe(
                {
                    next: (resp: any) => {
                        if (resp) {
                            setTimeout(() => {
                                this.getList();
                            }, 500);
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
        let dialog = this.__dialog.open(CuInfoPratiqueComponent,
            {
                panelClass: 'fullscreen-dialog',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: { type: 'edit', content: data, element: 'soumettre-doc', title: 'comment soumettre un dossier' }
            }
        )
        this.unscribe.add(
            dialog.afterClosed().subscribe(
                {
                    next: (resp: any) => {
                        if (resp) {
                            setTimeout(() => {
                                this.getList();
                            }, 500);
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
        let dialog = this.__dialog.open(DetailsInfoPratiqueComponent,
            {
                panelClass: 'fullscreen-dialog',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: { type: 'peronnel', content: data }
            }
        )
        this.unscribe.add(
            dialog.afterClosed().subscribe(
                {
                    next: (resp: any) => {
                        if (resp) {
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
    //--🍀🍀🍀🍀--//
    joinDocument(data: any){
        let dialog = this.__dialog.open(DocumentJoinsComponent,
            {
                panelClass: 'fullscreen-dialog',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: {
                    type: 'init',
                    content: data.code_ref,
                    element: 'soumettre-doc',
                    title: 'comment soumettre un dossier'
                }
            }
        )
        this.unscribe.add(
            dialog.afterClosed().subscribe(
                {
                    next: (resp: any) => {
                        if (resp) {
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
