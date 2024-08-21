import { Location } from '@angular/common';
import { Component } from '@angular/core';

import { MaterialModule } from '../../material-module';

@Component({
    selector: 'app-ooops',
    standalone: true,
    imports: [MaterialModule],
    templateUrl: './ooops.component.html',
    styleUrl: './ooops.component.css'
})
export class OoopsComponent {

    constructor(
        private __location: Location
    ) { }

    goToBack() {
        this.__location.back();
    }
}
