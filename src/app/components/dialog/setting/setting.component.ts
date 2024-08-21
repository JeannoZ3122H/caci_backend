import {
  DOCUMENT,
  isPlatformBrowser,
} from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { MaterialModule } from '../../../material-module';

@Component({
    selector: 'app-setting',
    standalone: true,
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
    ],
    templateUrl: './setting.component.html',
    styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit, OnDestroy{

    theme_light_img: string = "assets/img/generic/default-light.png";
    theme_dark_img: string = "assets/img/generic/default-dark.png";
    theme_auto_img: string = "assets/img/generic/auto.png";

    public theme: any = '';
    private intervalId: number | undefined;
    public localStorage: Storage | any;

    constructor(
        @Inject(PLATFORM_ID) private plateformeID: object,
        @Inject(DOCUMENT) private document: Document,
    ){}

    ngOnInit(): void {
        if(isPlatformBrowser(this.plateformeID)){
            this.localStorage = this.document.defaultView?.localStorage;
            if(this.localStorage){
                let theme: any = this.localStorage.getItem('phoenixTheme');
                if(theme){this.getOldChangeTheme(theme)}
            }
        }

        if (typeof window !== "undefined") {
            this.intervalId = window.setInterval(() => {this.checkCurrentTheme();}, 1000);
        }
    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 START EVENTS 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---__ 🍀🍀
        changeTheme(theme: any){
            if(isPlatformBrowser(this.plateformeID)){
                theme = theme.value;
                if(this.localStorage){
                    this.localStorage.setItem('phoenixTheme', theme);
                    if(theme == "dark"){
                        let html: any = this.document.querySelector('html');
                        html.setAttribute('data-bs-theme', 'dark');
                    }else if(theme == "light"){
                        let html: any = this.document.querySelector('html');
                        html.setAttribute('data-bs-theme', 'light');
                    }else if(theme == "default"){
                        let html: any = this.document.querySelector('html');
                        html.removeAttribute('data-bs-theme');
                    }else {
                        let html: any = this.document.querySelector('html');
                        html.removeAttribute('data-bs-theme');
                    }
                }
            }
        }

    // ---__ 🍀🍀
        getOldChangeTheme(theme: any){
            if(isPlatformBrowser(this.plateformeID)){
                if(theme == "dark"){
                    let html: any = this.document.querySelector('html');
                    html.setAttribute('data-bs-theme', 'dark');
                }else if(theme == "light"){
                    let html: any = this.document.querySelector('html');
                    html.setAttribute('data-bs-theme', 'light');
                }else if(theme == "default"){
                    let html: any = this.document.querySelector('html');
                    html.removeAttribute('data-bs-theme');
                }else {
                    let html: any = this.document.querySelector('html');
                    html.removeAttribute('data-bs-theme');
                }
            }
        }

    // ---__ 🍀🍀
        checkCurrentTheme(){
            if(isPlatformBrowser(this.plateformeID)){
                if(typeof window !== "undefined"){
                    this.intervalId = window.setInterval(() => {
                        if(this.localStorage){
                            let theme: any = this.localStorage.getItem('phoenixTheme');
                            if(theme){this.theme = theme;}
                        }
                    }, 100);
                }
            }
        }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 END EVENTS 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    ngOnDestroy(): void {
        if (this.intervalId !== undefined) {
            clearInterval(this.intervalId);
        }
    }
}
