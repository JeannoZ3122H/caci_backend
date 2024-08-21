import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NgxEditorModule } from 'ngx-editor';

import { MaterialModule } from '../../../../material-module';

@Component({
    selector: 'app-details-terms-and-conditions',
    standalone: true,
    imports: [
        MaterialModule,
        CommonModule,
        NgxEditorModule
    ],
    templateUrl: './details-terms-and-conditions.component.html',
    styleUrl: './details-terms-and-conditions.component.css'
})
export class DetailsTermsAndConditionsComponent implements OnInit, OnDestroy{

    public contents: any = {};
    constructor(
        // private _message: ToastService,
        // private _request: TermsAndPolicyService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        // private _dialogRef: MatDialogRef<DetailsTermsAndConditionsComponent>
    ) { }

    ngOnInit(): void {
        if(this.data != undefined || null){
            this.contents = this.data
        }
    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 START EVENTS 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // --- get __ 🍀🍀


// __------__ 🍀🍀🍀🍀🍀__---   🍀 END EVENTS 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    ngOnDestroy(): void {
        
    }
}
