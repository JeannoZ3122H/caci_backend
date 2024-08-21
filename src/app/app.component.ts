import {
  DOCUMENT,
  isPlatformBrowser,
} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NgxUiLoaderModule } from 'ngx-ui-loader';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HttpClientModule, NgxUiLoaderModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
    title = 'CACI | TABLEAU DE BORD';

    public localStorage: Storage | any;

    constructor(
        @Inject(PLATFORM_ID) private _plateformeId: Object,
        @Inject(DOCUMENT) private _document: Document,
    ){}

    ngOnInit(): void {
        if(isPlatformBrowser(this._plateformeId)){
            this.localStorage = this._document.defaultView?.localStorage;
            if(this.localStorage){
                let theme: any = this.localStorage.getItem('phoenixTheme');
                if(theme == null || undefined){
                    let html: any = this._document.querySelector('html');
                    html.setAttribute('data-bs-theme', 'light');
                }
            }
        }
    }
}
