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
  CuMissionComponent,
} from '../../../components/forms/about/cu-mission/cu-mission.component';
import {
  DetailsMissionsComponent,
} from '../../../components/forms/about/details-missions/details-missions.component';
import { MaterialModule } from '../../../material-module';
import {
  MissionsService,
} from '../../../services/request/about/missions/missions.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
    selector: 'app-mission-us',
    standalone: true,
    imports: [
        MaterialModule,
        RouterModule,
        NgxPaginationModule,
        DatePipe
    ],
    templateUrl: './mission-us.component.html',
    styleUrl: './mission-us.component.css'
})
export class MissionUsComponent implements OnInit, OnDestroy{

    public list_mission: any [] = [];
    private unscribe = new Subscription();
    p: number =1;

    constructor(
        private __dialog: MatDialog,
        private __message: ToastService,
        private __request: MissionsService
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
                        this.list_mission = resp;
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
        let dialog = this.__dialog.open(CuMissionComponent,
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
        let dialog = this.__dialog.open(CuMissionComponent,
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
        let dialog = this.__dialog.open(DetailsMissionsComponent,
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
