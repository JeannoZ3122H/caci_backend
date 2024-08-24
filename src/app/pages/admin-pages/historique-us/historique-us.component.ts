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
  CuHistoriqueComponent,
} from '../../../components/forms/about/cu-historique/cu-historique.component';
import {
  DetailsHistoriqueComponent,
} from '../../../components/forms/about/details-historique/details-historique.component';
import { MaterialModule } from '../../../material-module';
import {
  HistoriqueService,
} from '../../../services/request/historique/historique.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
    selector: 'app-historique-us',
    standalone: true,
    imports: [
        MaterialModule,
        RouterModule,
        NgxPaginationModule,
        DatePipe
    ],
    templateUrl: './historique-us.component.html',
    styleUrl: './historique-us.component.css'
})
export class HistoriqueUsComponent implements OnInit, OnDestroy{

    public list_historique: any [] = [];
    private unscribe = new Subscription();
    p: number =1;

    constructor(
        private __dialog: MatDialog,
        private __message: ToastService,
        private __request: HistoriqueService
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
                        this.list_historique = resp;
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
        let dialog = this.__dialog.open(CuHistoriqueComponent,
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
        let dialog = this.__dialog.open(CuHistoriqueComponent,
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
        let dialog = this.__dialog.open(DetailsHistoriqueComponent,
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
