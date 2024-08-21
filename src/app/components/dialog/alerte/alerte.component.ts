import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { MaterialModule } from '../../../material-module';

@Component({
    selector: 'app-alerte',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
    ],
    templateUrl: './alerte.component.html',
    styleUrl: './alerte.component.css'
})
export class AlerteComponent implements OnInit{

    is_logout: boolean = false;

    constructor(
        private _dialogRef: MatDialogRef<AlerteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ){}

    ngOnInit(): void {
        if(this.data != null || this.data == 'is_logout'){
            this.is_logout = true;
        }else{
            this.is_logout = false;
        }
    }

    close(option: boolean) {
        setTimeout(() => {
            this._dialogRef.close(option);
        }, 1000);
    }
}
