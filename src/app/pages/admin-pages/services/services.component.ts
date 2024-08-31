import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription } from 'rxjs';

import {
  DocumentJoinsComponent,
} from '../../../components/forms/document-joins/document-joins.component';
import {
  CuServicesComponent,
} from '../../../components/forms/services/cu-services/cu-services.component';
import {
  DetailsServicesComponent,
} from '../../../components/forms/services/details-services/details-services.component';
import { MaterialModule } from '../../../material-module';
import { AuthService } from '../../../services/auth/auth.service';
import {
  ServicesService,
} from '../../../services/request/services/services.service';
import {
  TypeServicesService,
} from '../../../services/request/type-services/type-services.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-services',
  standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        NgxPaginationModule
    ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit, OnDestroy, AfterViewInit{

    public list_arbitrage: any [] = [];
    private unscribe = new Subscription();
    p: number =1;
    public type_content: any = "";
    public type_content_code: any = "";
    public content: any;

    constructor(
        private __dialog: MatDialog,
        private __message: ToastService,
        private __request_type_service: TypeServicesService,
        private __request: ServicesService,
        private __route: ActivatedRoute,
        private _auth: AuthService
    ){}

    ngOnInit(): void {
        this.type_content = this.__route.snapshot.paramMap.get('type_service');
        this.type_content_code = this.__route.snapshot.paramMap.get('type_service_code');
        this.getCurrentService();
        this.__route.params.subscribe((_: any)=>{
            this.type_content = this.__route.snapshot.paramMap.get('type_service');
            this.type_content_code = this.__route.snapshot.paramMap.get('type_service_code');
            this.getCurrentService();
        });
    }

    ngAfterViewInit(): void {

    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//
    // 🍀🍀 --- Get Current Service --- 🍀🍀
    getCurrentService(){
        this.unscribe.add(
            this.__request_type_service.get().subscribe(
                {
                    next: (resp: any) => {
                        if(resp){
                            resp.forEach((el: any, indx: number)=>{
                                if(el.type_service_code == this.type_content_code){
                                    this.content = resp[indx];
                                }
                            });
                            this.getCurrentServiceList();
                        }
                    },
                    error: (err: any) => {
                        if(err.status == 401){
                            this._auth.autoLogOut();
                        }
                    }
                }
            )
        );
    }
    // 🍀🍀 --- Get List --- 🍀🍀
    getCurrentServiceList(){
        this.unscribe.add(
            this.__request.get(this.content.id).subscribe(
                {
                    next: (resp: any) => {
                        this.list_arbitrage = resp;
                    },
                    error: (err: any) => {
                        if(err.status == 401){
                            this._auth.autoLogOut();
                        }
                    }
                }
            )
        );
    }
    // 🍀🍀 --- Delete Current Item --- 🍀🍀
    delete(slg: any){
        this.unscribe.add(
            this.__request.delete(slg).subscribe(
                {
                    next: (resp: any) => {
                        if(resp.code == 100){
                            this.__message.showSuccess(resp);
                        }else{
                            this.__message.showError(resp);
                        }
                    },
                    error: (err: any) => {
                        if(err.status == 401){
                            this._auth.autoLogOut();
                        }
                    }
                }
            )
        );
    }
// __------__ 🍀🍀🍀🍀🍀__---   🍀 END REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START EVENTS 🍀   ---__ 🍀🍀🍀🍀🍀__------__//
    // ---__ 🍀🍀
    addNewItem(){
        let dialog = this.__dialog.open(CuServicesComponent,
            {
                panelClass: 'fullscreen-dialog',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: {type: 'add', type_service_data: this.content}
            }
        );
        this.unscribe.add(
            dialog.afterClosed().subscribe(
                {
                    next: (resp: any) => {
                        if(resp == true){
                            this.getCurrentServiceList();
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
        let dialog = this.__dialog.open(CuServicesComponent,
            {
                panelClass: 'fullscreen-dialog',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: {type: 'edit', content: data, type_service_data: this.content}
            }
        );
        this.unscribe.add(
            dialog.afterClosed().subscribe(
                {
                    next: (resp: any) => {
                        if(resp == true){
                            this.getCurrentServiceList();
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
        let dialog = this.__dialog.open(DetailsServicesComponent,
            {
                panelClass: 'fullscreen-dialog',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: {type: 'peronnel', content: data}
            }
        );
        this.unscribe.add(
            dialog.afterClosed().subscribe(
                {
                    next: (resp: any) => {
                        if(resp == true){
                            this.getCurrentServiceList();
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
        );
        this.unscribe.add(
            dialog.afterClosed().subscribe(
                {
                    next: (resp: any) => {
                        if (resp) {
                            this.getCurrentServiceList();
                        }
                    },
                    error: () => {
                        this.__message.showError({ title: 'Attention!', message: "Quelque s'est mal passé." });
                    },
                }
            )
        );
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 END EVENTS 🍀   ---__ 🍀🍀🍀🍀🍀__------__//


    ngOnDestroy(): void {
        this.unscribe.unsubscribe();
    }

}
