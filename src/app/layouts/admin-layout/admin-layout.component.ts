import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';

import {
  AdminNavbarComponent,
} from '../../components/admin-navbar/admin-navbar.component';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    imports: [
        CommonModule,
        AdminNavbarComponent
    ],
    templateUrl: './admin-layout.component.html',
    styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit{

    constructor(
    ){}

    ngOnInit(): void {
    }
}
