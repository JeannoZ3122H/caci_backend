import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../../material-module';

@Component({
    selector: 'app-delete-single-item',
    standalone: true,
    imports: [
        MaterialModule,
        CommonModule,
        RouterModule
    ],
    templateUrl: './delete-single-item.component.html',
    styleUrl: './delete-single-item.component.css'
})
export class DeleteSingleItemComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<DeleteSingleItemComponent>
    ){}

    close(option: boolean) {
        setTimeout(() => {
            this._dialogRef.close(option);
        }, 1000);
    }
}
