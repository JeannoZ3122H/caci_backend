import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../../material-module';

@Component({
    selector: 'app-forget-password',
    standalone: true,
    imports: [
        RouterModule, 
        MaterialModule,
        FormsModule, 
        ReactiveFormsModule
    ],
    templateUrl: './forget-password.component.html',
    styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {



    constructor(
        private __location: Location
    ){}

    goToBack(){
        this.__location.back();
    }
}
