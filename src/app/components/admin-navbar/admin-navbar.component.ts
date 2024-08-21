import {
  CommonModule,
  DOCUMENT,
  isPlatformBrowser,
  isPlatformServer,
} from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import {
  Router,
  RouterModule,
} from '@angular/router';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';

import { MaterialModule } from '../../material-module';
import { AuthService } from '../../services/auth/auth.service';
import {
  CookieSecureService,
} from '../../services/secure/cookie-secure/cookie-secure.service';
import {
  LsSecureService,
} from '../../services/secure/ls-secure/ls-secure.service';
import { ToastService } from '../../services/toast/toast.service';
import { AdminFooterComponent } from '../admin-footer/admin-footer.component';
import { AlerteComponent } from '../dialog/alerte/alerte.component';
import {
  SettingContentComponent,
} from '../setting-content/setting-content.component';

@Component({
    selector: 'app-admin-navbar',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        AdminFooterComponent,
        SettingContentComponent,
    ],
    templateUrl: './admin-navbar.component.html',
    styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent implements OnInit, OnDestroy{

    @ViewChild('drawer') drawer!: MatSidenav;
    sidebar_menu_list: any[] = [
        {
            id: 1,
            category: 'Generalité',
            nav_item: 'Tableau de bord',
            icon_category: 'widgets',
            icon: 'home',
            route: ['/web-admin.dashboard'],
            nav_list: false
        },
        {
            id: 2,
            nav_item: 'Messagerie',
            icon: 'sms',
            route: ['/web-admin.message-received'],
            nav_list: false
        },
        {
            id: 2,
            nav_item: 'NewsLetter',
            icon: 'mark_email_unread',
            route: ['/web-admin.newsletters'],
            nav_list: false
        },
        {
            id: 3,
            category: 'Compte',
            nav_item: 'Admin',
            icon_category: 'manage_accounts',
            icon: 'supervisor_account',
            route: ['/web-admin.account-admin'],
            nav_list: false
        },
        {
            id: 3,
            nav_item: 'Personnel',
            icon: 'person',
            route: ['/web-admin.account-teams-us'],
            nav_list: false
        },
        {
            id: 4,
            category: 'Services',
            nav_item: 'Arbitrage',
            icon_category: 'service_toolbox',
            icon: 'gavel',
            route: ['/web-admin.service-arbitrage'],
            nav_list: false
        },
        {
            id: 5,
            nav_item: 'Médiation',
            icon: 'auto_stories',
            route: ['/web-admin.service-mediation'],
            nav_list: false
        },
        {
            id: 5,
            nav_item: 'Expertise',
            icon: 'assured_workload',
            route: ['/web-admin.service-expertise'],
            nav_list: false
        },
        {
            id: 5,
            nav_item: 'Formation',
            icon: 'book_2',
            route: ['/web-admin.service-formation'],
            nav_list: false
        },
        {
            id: 4,
            category: 'Évènements',
            nav_item: 'Bannière',
            icon_category: 'newspaper',
            icon: 'event',
            route: ['/web-admin.banner-event'],
            nav_list: false
        },
        {
            id: 5,
            nav_item: 'Actualités',
            icon: 'edit_calendar',
            route: ['/web-admin.news-event'],
            nav_list: false
        },
        {
            id: 6,
            category: 'Pages',
            nav_item: 'Image accueil',
            icon_category: 'newspaper',
            icon: 'event',
            route: ['/web-admin.slide-une-img'],
            nav_list: false
        },
        {
            id: 7,
            nav_item: 'Partenaire',
            icon: 'settings',
            route: ['/web-admin.partners-us'],
            nav_list: false
        },
        {
            id: 7,
            nav_item: 'Témoignages',
            icon: 'sentiment_very_satisfied',
            route: ['/web-admin.testimonials'],
            nav_list: false
        },
        {
            id: 3,
            category: 'Paramètres du site',
            nav_item: 'Rôle',
            icon_category: 'engineering',
            icon: 'settings',
            route: ['/web-admin.role'],
            nav_list: false
        },
        {
            id: 3,
            nav_item: 'Type évènements',
            icon: 'settings',
            route: ['/web-admin.type-events'],
            nav_list: false
        },
        {
            id: 3,
            nav_item: 'Historique',
            icon: 'settings',
            route: ['/web-admin.historics-us'],
            nav_list: false
        },
        {
            id: 3,
            nav_item: 'Statistique',
            icon: 'settings',
            route: ['/web-admin.statistics-us'],
            nav_list: false
        },
    ];

    page_menu_list: any [] = [
        {
            id: 1,
            nav_item: 'Termes & Conditions',
            icon: 'policy',
            route: ['/web-admin.terms-and-policy'],
            nav_list: false
        },
    ];

    toDay: Date = new Date();

    public is_light_theme: boolean = true;
    public is_dark_theme: boolean = false;

    public scrollHeight!: number;
    public screenWidth!: number;

    private unscribe = new Subscription();
    public theme: any = '';

    private intervalId: number | undefined;
    public user: any = {};

    constructor (
        private __router: Router,
        private __dialog: MatDialog,
        private __message: ToastService,
        private __request: AuthService,
        @Inject(PLATFORM_ID) private __plateformeId: Object,
        @Inject(DOCUMENT) private document: any,
        private __localStorage: LsSecureService,
        private __loading: NgxUiLoaderService,
        private __coockie: CookieSecureService,
    ){
        if(isPlatformBrowser(this.__plateformeId) || isPlatformServer(this.__plateformeId)){
            if (typeof window !== "undefined") {
                this.screenWidth = window.innerWidth;
                window.onresize = () => {
                    this.screenWidth = window.innerWidth;
                };

                this.intervalId = window.setInterval(() => {
                    this.checkCurrentTheme();
                }, 1000);
            }
        }
    }

    ngOnInit(): void {
        const data = this.__localStorage.getDataToStorage();
        if(data){
            this.user = data;
        }
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//
    // logOut ---__ 🍀🍀
    logOut(){
        const _dialog = this.__dialog.open(AlerteComponent,
            {
                panelClass: 'width-delete',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                position:{top: '4%'},
                data: 'is_logout'
            }
        );
        this.unscribe.add(
            _dialog.afterClosed().subscribe(
                {
                    next: (resp: any) => {
                        if (resp == true) {
                            this.__loading.start();
                            this.__request.logOut(this.user.id).subscribe(
                                {
                                    next: (resp: any) =>{
                                        if(resp.code == 100){
                                            this.__coockie.clearAll();
                                            this.__localStorage.clearAll();
                                            this.__loading.stop();
                                            setTimeout(() => {
                                                this.__message.showSuccess(resp);
                                                this.__router.navigateByUrl('/');
                                            }, 1000);
                                        }else{
                                            this.__loading.stop();
                                            this.__message.showError(resp)
                                        }
                                    }, error: (err: any) =>{
                                        this.__loading.stop();
                                        if(err.code == 301 || 401 || (err.message).includes('Unauthorized')){
                                            this.__message.showError({status: "Session", message: "Votre session est expiré!. merci de vous reconnceter."})
                                        }
                                    }
                                }
                            )
                        }
                    }
                }
            )
        );
    }
// __------__ 🍀🍀🍀🍀🍀__---   🍀 END REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

// __------__ 🍀🍀🍀🍀🍀__---   🍀 START EVENTS 🍀   ---__ 🍀🍀🍀🍀🍀__------__//
    // ---__ 🍀🍀
    changeTheme(theme: any){
        if(isPlatformBrowser(this.__plateformeId) || isPlatformServer(this.__plateformeId)){
            this.document.defaultView?.localStorage.setItem('phoenixTheme', theme);
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

            setTimeout(() => {
                this.theme = theme;
            }, 100);
        }
    }
    // ---__ 🍀🍀
    checkCurrentTheme(){
        if(isPlatformBrowser(this.__plateformeId) || isPlatformServer(this.__plateformeId)){
            setInterval(()=>{
                let theme: any = this.document.defaultView?.localStorage.getItem('phoenixTheme');
                if(theme){
                    this.theme = theme;
                }
            }, 100)
        }
    }
// __------__ 🍀🍀🍀🍀🍀__---   🍀 END EVENTS 🍀   ---__ 🍀🍀🍀🍀🍀__------__//


    ngOnDestroy(): void {
        if (this.intervalId !== undefined) {
            clearInterval(this.intervalId);
        }
        this.unscribe.unsubscribe();
    }
}
