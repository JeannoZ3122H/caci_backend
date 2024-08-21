import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription } from 'rxjs';

import {
  CuArbitrageComponent,
} from '../../../components/forms/services/arbitrages/cu-arbitrage/cu-arbitrage.component';
import {
  DetailsArbitrageComponent,
} from '../../../components/forms/services/arbitrages/details-arbitrage/details-arbitrage.component';
import { MaterialModule } from '../../../material-module';
import {
  ArbitrageService,
} from '../../../services/request/admin/services/arbitrage/arbitrage.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
    selector: 'app-arbitrage-us',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        NgxPaginationModule
    ],
    templateUrl: './arbitrage-us.component.html',
    styleUrl: './arbitrage-us.component.css'
})
export class ArbitrageUsComponent implements OnInit, OnDestroy, AfterViewInit{


    public list_arbitrage: any [] = [
        {
            id: 1,
            libelle: "Généralités",
            status_list: true,
            list_type: 'grid/tree/checked_list/table',
            item_grid_list: [
                {
                    id: 1,
                    libelle: "",
                    description: ``,
                    icon_svg: ""
                },
            ],
            item_checked_list: [
                {
                    id: 1,
                    libelle: "",
                    description: ``,
                    icon_svg: "default"
                },
            ],
            item_table_list: [
                {
                    id: 1,
                    libelle: "",
                    description: ``,
                    link: ``,
                    icon_svg: ""
                },
            ],
            illustration: "",
            description: `

            `,
            created_at: new Date()
        },
        {
            id: 2,
            libelle: "Étapes de demande de médiation",
            status_list: true,
            list_type: 'grid/tree/checked_list/table',
            item_grid_list: [
                {
                    id: 1,
                    libelle: "",
                    description: ``,
                    icon_svg: ""
                },
            ],
            item_checked_list: [
                {
                    id: 1,
                    libelle: "",
                    description: ``,
                    icon_svg: "default"
                },
            ],
            item_table_list: [
                {
                    id: 1,
                    libelle: "",
                    description: ``,
                    link: ``,
                    icon_svg: ""
                },
            ],
            illustration: "",
            description: `

            `,
            created_at: new Date()
        },
        {
            id: 3,
            libelle: "Avantages",
            status_list: true,
            list_type: 'grid/tree/checked_list/table',
            item_grid_list: [
                {
                    id: 1,
                    libelle: "",
                    description: ``,
                    icon_svg: ""
                },
            ],
            item_checked_list: [
                {
                    id: 1,
                    libelle: "",
                    description: ``,
                    icon_svg: "default"
                },
            ],
            item_table_list: [
                {
                    id: 1,
                    libelle: "",
                    description: ``,
                    link: ``,
                    icon_svg: ""
                },
            ],
            illustration: "",
            description: `

            `,
            created_at: new Date()
        }
    ];
    private unscribe = new Subscription();
    p: number =1;
    constructor(
        private __dialog: MatDialog,
        private __message: ToastService,
        private __request: ArbitrageService
    ){}

    ngOnInit(): void {
        this.addNewItem()
    }

    ngAfterViewInit(): void {

    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---get all __ 🍀🍀
    getList(){
        this.unscribe.add(
            this.__request.get().subscribe(
                {
                    next: (resp: any) => {
                        this.list_arbitrage = resp;
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
        let dialog = this.__dialog.open(CuArbitrageComponent,
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
    // ---__ 🍀🍀 Add New Role
    editCurrentItem(data: any){
        let dialog = this.__dialog.open(CuArbitrageComponent,
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
        let dialog = this.__dialog.open(DetailsArbitrageComponent,
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
