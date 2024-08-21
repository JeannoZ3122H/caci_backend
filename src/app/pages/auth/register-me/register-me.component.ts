import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-register-me',
    standalone: true,
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './register-me.component.html',
    styleUrl: './register-me.component.css'
})
export class RegisterMeComponent {



    constructor(
        private __location: Location
    ){}

    goToBack(){
        this.__location.back();
    }
}
