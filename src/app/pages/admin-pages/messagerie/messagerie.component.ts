import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
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
  CuMessagerieComponent,
} from '../../../components/forms/messagerie/cu-messagerie/cu-messagerie.component';
import { MaterialModule } from '../../../material-module';
import {
  MessagerieService,
} from '../../../services/request/admin/messagerie/messagerie.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
    selector: 'app-messagerie',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        NgxPaginationModule,
        DragDropModule
    ],
    templateUrl: './messagerie.component.html',
    styleUrl: './messagerie.component.css'
})
export class MessagerieComponent implements OnInit, OnDestroy {

    public list_message: any[] = [
        {
            id: 1,
            sender: 'John Doe Mark',
            content: `It’s not all slop: how to overcome AI’s problems`,
            link: ['/'],
            slug: 'test @ 1111'
        },
        {
            id: 2,
            sender: 'Maria Doe Mark',
            content: `“mindlessly generated and thrust upon someone who didn’t ask for it.”`,
            link: ['/'],
            slug: 'test @ 1111'
        },
    ];
    private unscribe = new Subscription();
    p: number = 1;
    constructor(
        private __dialog: MatDialog,
        private __message: ToastService,
        private __request: MessagerieService
    ) { }

    ngOnInit(): void {
        // this.getListMessage();
    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---get all list__ 🍀🍀
    getListMessage() {
        this.unscribe.add(
            this.__request.get().subscribe(
                {
                    next: (resp: any) => {
                        console.log('resp', resp)
                        this.list_message = resp;
                    },
                    error: (err: any) => {
                        console.log('error', err)
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

    // ---__ 🍀🍀 Add New Item
    addNewItem() {
        let dialog = this.__dialog.open(CuMessagerieComponent,
            {
                width: 'auto',
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
                            this.getListMessage();
                        }
                    },
                    error: () => {
                        this.__message.showError({ title: 'Attention!', message: "Quelque s'est mal passé." });
                    },
                }
            )
        );
    }
    // ---__ 🍀🍀 Add New Item
    editCurrentItem(data: any) {
        let dialog = this.__dialog.open(CuMessagerieComponent,
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
                            this.getListMessage();
                        }
                    },
                    error: () => {
                        this.__message.showError({ title: 'Attention!', message: "Quelque s'est mal passé." });
                    },
                }
            )
        );
    }
    // drap message item
    drop(event: CdkDragDrop<string[]> | any) {
        moveItemInArray(this.list_message, event.previousIndex, event.currentIndex);
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 END REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    ngOnDestroy(): void {
        this.unscribe.unsubscribe();
    }

}
