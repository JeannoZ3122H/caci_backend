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
  CuRoleComponent,
} from '../../../components/forms/role/cu-role/cu-role.component';
import { MaterialModule } from '../../../material-module';
import { RoleService } from '../../../services/request/admin/role/role.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
    selector: 'app-role',
    standalone: true,
    imports: [
        MaterialModule,
        RouterModule,
        NgxPaginationModule
    ],
    templateUrl: './role.component.html',
    styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit, OnDestroy {


    private unscribe = new Subscription();
    public list_role: any[] = [];
    p: number =1;
    constructor(
        private __dialog: MatDialog,
        private __message: ToastService,
        private __request: RoleService,
        private __loading: NgxUiLoaderService
    ){}

    ngOnInit(): void {
        this.getListRole();
    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---get all __ 🍀🍀
    getListRole(){
        this.unscribe.add(
            this.__request.get().subscribe(
                {
                    next: (resp: any) => {
                        this.list_role = resp;
                    },
                    error: (err: any) => {
                        console.log('server', err)
                    }
                }
            )
        )
    }
    // ---delete current item__ 🍀🍀
    delete(slg: any){
        this.__loading.start();
        this.unscribe.add(
            this.__request.delete(slg).subscribe(
                {
                    next: (resp: any) => {
                        if(resp.code == 100){
                            this.__loading.stop();
                            this.__message.showSuccess(resp);
                            this.getListRole();
                        }else{
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
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 END REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START EVENTS 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---__ 🍀🍀 Add New Role
    addNewRole(){
        let dialog = this.__dialog.open(CuRoleComponent,
            {
                width: 'auto',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: {type: 'add'}
            }
        );
        this.unscribe.add(
            dialog.afterClosed().subscribe((resp: any)=>
                {
                    if(resp){
                        this.getListRole();
                    }
                }
            )
        );
    }
    // ---__ 🍀🍀 Add New Role
    editCurrentRole(data: any){
        let dialog = this.__dialog.open(CuRoleComponent,
            {
                width: 'auto',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: {type: 'edit', content: data}
            }
        );
        this.unscribe.add(
            dialog.afterClosed().subscribe((resp: any)=>
                {
                    if(resp){
                        this.getListRole();
                    }
                }
            )
        );
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 END REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    ngOnDestroy(): void {
        this.unscribe.unsubscribe();
    }
}
