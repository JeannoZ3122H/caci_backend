import {
  CommonModule,
  isPlatformBrowser,
  isPlatformServer,
} from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';

import { MaterialModule } from '../../material-module';
import { SettingComponent } from '../dialog/setting/setting.component';

@Component({
    selector: 'app-setting-content',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        SettingComponent
    ],
    templateUrl: './setting-content.component.html',
    styleUrl: './setting-content.component.css'
})
export class SettingContentComponent implements OnInit{

    constructor(
        // private __render: Renderer2,
        @Inject(PLATFORM_ID) private plateformeID: object,
        // @Inject(DOCUMENT) private document: any,
    ){}

    ngOnInit(): void {
        if(isPlatformBrowser(this.plateformeID) || isPlatformServer(this.plateformeID)){

        }
    }

}
