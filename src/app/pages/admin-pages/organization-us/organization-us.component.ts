import { DatePipe } from '@angular/common';
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
  CuOrganisationComponent,
} from '../../../components/forms/about/cu-organisation/cu-organisation.component';
import {
  DetailsOrganisationComponent,
} from '../../../components/forms/about/details-organisation/details-organisation.component';
import { MaterialModule } from '../../../material-module';
import {
  OrganisationService,
} from '../../../services/request/about/organisation/organisation.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
    selector: 'app-organization-us',
    standalone: true,
    imports: [
        MaterialModule,
        RouterModule,
        NgxPaginationModule,
        DatePipe
    ],
    templateUrl: './organization-us.component.html',
    styleUrl: './organization-us.component.css'
})
export class OrganizationUsComponent implements OnInit, OnDestroy{

    public list_organisation: any [] = [];
    private unscribe = new Subscription();
    p: number =1;

    constructor(
        private __dialog: MatDialog,
        private __message: ToastService,
        private __request: OrganisationService
    ){}

    ngOnInit(): void {
        this.getList();
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---get all __ 🍀🍀
    getList(){
        this.unscribe.add(
            this.__request.get().subscribe(
                {
                    next: (resp: any) => {
                        this.list_organisation = resp;
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
                            this.getList();
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
        let dialog = this.__dialog.open(CuOrganisationComponent,
            {
                panelClass: 'fullscreen-dialog',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: {type: 'add'}
            }
        )
        this.unscribe.add(
            dialog.afterClosed().subscribe(
                {
                    next: (resp: any) => {
                        if(resp == true){
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
    // ---__ 🍀🍀 Add New
    editCurrentItem(data: any){
        let dialog = this.__dialog.open(CuOrganisationComponent,
            {
                panelClass: 'fullscreen-dialog',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: {type: 'edit', content: data}
            }
        )
        this.unscribe.add(
            dialog.afterClosed().subscribe(
                {
                    next: (resp: any) => {
                        if(resp == true){
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
    // ---__ 🍀🍀 Add New Role
    showDetails(data: any){
        let dialog = this.__dialog.open(DetailsOrganisationComponent,
            {
                panelClass: 'fullscreen-dialog',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: {type: 'peronnel', content: data}
            }
        )
        this.unscribe.add(
            dialog.afterClosed().subscribe(
                {
                    next: (resp: any) => {
                        if(resp == true){
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
