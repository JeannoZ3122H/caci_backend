import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription } from 'rxjs';

import {
  CuAdminAccountComponent,
} from '../../../components/forms/admin-accounts/cu-admin-account/cu-admin-account.component';
import {
  DetailsAdminAccountComponent,
} from '../../../components/forms/admin-accounts/details-admin-account/details-admin-account.component';
import { MaterialModule } from '../../../material-module';
import {
  AdminAccountsService,
} from '../../../services/request/admin/admin-accounts/admin-accounts.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
    selector: 'app-admin-accounts',
    standalone: true,
    imports: [
        MaterialModule,
        MatSlideToggleModule,
        RouterModule,
        NgxPaginationModule
    ],
    templateUrl: './admin-accounts.component.html',
    styleUrl: './admin-accounts.component.css'
})
export class AdminAccountsComponent implements OnInit, OnDestroy{


    private unscribe = new Subscription();
    public list_admin_account: any[] = [];
    p: number =1;
    constructor(
        private __dialog: MatDialog,
        private __message: ToastService,
        private __request: AdminAccountsService
    ){}

    ngOnInit(): void {
        this.getList();
    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---get all admin account__ 🍀🍀
    getList(){
        this.unscribe.add(
            this.__request.get().subscribe(
                {
                    next: (resp: any) => {
                        if(resp){
                            // console.log(resp)
                            this.list_admin_account = resp;
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
    delete(slg: any){
        this.unscribe.add(
            this.__request.delete(slg).subscribe(
                {
                    next: (resp: any) => {
                        if(resp.code == 100){
                            this.__message.showSuccess(resp);
                            setTimeout(() => {
                                this.getList();
                            }, 500);
                        }else{
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
    //
    checkStatus(data: any){
        this.unscribe.add(
            this.__request.checkUsersStatus(data.slug).subscribe(
                {
                    next: (resp: any) => {
                        console.log('resp', resp)
                        if(resp.code == 100){
                            this.__message.showSuccess(resp);
                            setTimeout(() => {
                                this.getList();
                            }, 500);
                        }else{
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
    addNewItem(){
        let dialog = this.__dialog.open(CuAdminAccountComponent,
            {
                width: '80%',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: {type: 'add'}
            }
        )
        this.unscribe.add(
            dialog.afterClosed().subscribe(
                {
                    next: (resp: any) => {
                        if(resp){
                            setTimeout(() => {
                                this.getList();
                            }, 500);
                        }
                    },
                    error: () =>{
                        this.__message.showError({title: 'Attention!', message: "Quelque s'est mal passé."});
                    },
                }
            )
        );
    }
    // ---__ 🍀🍀 Add New Role
    editCurrentItem(data: any){
        let dialog = this.__dialog.open(CuAdminAccountComponent,
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
                        if(resp){
                            setTimeout(() => {
                                this.getList();
                            }, 500);
                        }
                    },
                    error: () =>{
                        this.__message.showError({title: 'Attention!', message: "Quelque s'est mal passé."});
                    },
                }
            )
        );
    }
    // ---__ 🍀🍀 Add New Role
    showDetails(data: any){
        let dialog = this.__dialog.open(DetailsAdminAccountComponent,
            {
                width: 'auto',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: {type: 'peronnel', content: data}
            }
        )
        this.unscribe.add(
            dialog.afterClosed().subscribe(
                {
                    next: (resp: any) => {
                        if(resp){
                            this.getList();
                        }
                    },
                    error: () =>{
                        this.__message.showError({title: 'Attention!', message: "Quelque s'est mal passé."});
                    },
                }
            )
        );
    }
    // ---__ 🍀🍀
    userImg(user_img: any): String{
        return `max-width: 400px;
        background-image: url(${user_img});
        background-size: cover;`
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 END EVENTS 🍀   ---__ 🍀🍀🍀🍀🍀__------__//


    ngOnDestroy(): void {
        this.unscribe.unsubscribe();
    }
}
