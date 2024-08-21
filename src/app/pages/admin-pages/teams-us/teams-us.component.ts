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
import { RouterModule } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';

import {
  DeleteSingleItemComponent,
} from '../../../components/dialog/delete-single-item/delete-single-item.component';
import {
  DetailsAdminAccountComponent,
} from '../../../components/forms/admin-accounts/details-admin-account/details-admin-account.component';
import {
  CuTeamsComponent,
} from '../../../components/forms/teams/cu-teams/cu-teams.component';
import { MaterialModule } from '../../../material-module';
import {
  TeamsService,
} from '../../../services/request/admin/teams/teams.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
    selector: 'app-teams-us',
    standalone: true,
    imports: [
        MaterialModule,
        RouterModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        FormsModule
    ],
    templateUrl: './teams-us.component.html',
    styleUrl: './teams-us.component.css'
})
export class TeamsUsComponent implements OnInit, OnDestroy {


    private unscribe = new Subscription();
    public list_teams: any[] = [];
    p: number = 1;
    constructor(
        private __dialog: MatDialog,
        private __message: ToastService,
        private __request: TeamsService,
        private __loading: NgxUiLoaderService
    ) { }

    ngOnInit(): void {
        this.getList();
    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---get all __ 🍀🍀
    getList() {
        this.unscribe.add(
            this.__request.get().subscribe(
                {
                    next: (resp: any) => {
                        this.list_teams = resp;
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

    // ---__ 🍀🍀
    addNewAdmin() {
        let dialog = this.__dialog.open(CuTeamsComponent,
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
    // ---__ 🍀🍀 Add New Role
    editCurrentItem(data: any) {
        let dialog = this.__dialog.open(CuTeamsComponent,
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
    // ---__ 🍀🍀 Add New Role
    showDetails(data: any) {
        let dialog = this.__dialog.open(DetailsAdminAccountComponent,
            {
                width: 'auto',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: { type: 'peronnel', content: data }
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
