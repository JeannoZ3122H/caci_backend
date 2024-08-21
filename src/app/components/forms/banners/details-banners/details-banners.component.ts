import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { MaterialModule } from '../../../../material-module';

@Component({
    selector: 'app-details-banners',
    standalone: true,
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule
    ],
    templateUrl: './details-banners.component.html',
    styleUrl: './details-banners.component.css'
})
export class DetailsBannersComponent implements OnInit, OnDestroy {

    public item_data: any = {};
    private unsubscribe = new Subscription();
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        // @Inject(PLATFORM_ID) public _plateFormId: Object,
        // @Inject(DOCUMENT) public _document: Document,
        private _dialogRef: MatDialogRef<DetailsBannersComponent>,
    ) { }

    ngOnInit(): void {
        if (this.data != null) {
            this.item_data = this.data.content;
        }
    }


    // __------__ 🍀🍀🍀🍀🍀__---   🍀 START EVENT 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---get event__ 🍀🍀
    closeDialog() {
        this._dialogRef.close();
    }

    // __------__ 🍀🍀🍀🍀🍀__---   🍀 END EVENT 🍀   ---__ 🍀🍀🍀🍀🍀__------__//


    ngOnDestroy(): void {
        this.unsubscribe.unsubscribe()
    }
}
