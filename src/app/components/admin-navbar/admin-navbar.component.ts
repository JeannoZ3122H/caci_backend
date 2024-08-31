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
  TypeServicesService,
} from '../../services/request/type-services/type-services.service';
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
    public sidebar_menu_list: any[] = [
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
            id: 3,
            nav_item: 'NewsLetter',
            icon: 'mark_email_unread',
            route: ['/web-admin.newsletters'],
            nav_list: false
        },
        {
            id: 4,
            category: 'Compte',
            nav_item: 'Admin',
            icon_category: 'manage_accounts',
            icon: 'supervisor_account',
            route: ['/web-admin.account-admin'],
            nav_list: false
        },
        {
            id: 5,
            nav_item: 'Personnel',
            icon: 'person',
            route: ['/web-admin.account-teams-us'],
            nav_list: false
        },
        {
            id: 6,
            category: 'À propos',
            nav_item: 'Historique',
            icon_category: 'service_toolbox',
            icon: 'gavel',
            route: ['/web-admin.about-historiques'],
            nav_list: false
        },
        {
            id: 7,
            nav_item: 'Missions',
            icon: 'auto_stories',
            route: ['/web-admin.about-missions'],
            nav_list: false
        },
        {
            id: 8,
            nav_item: 'Organisations',
            icon: 'auto_stories',
            route: ['/web-admin.about-organisations'],
            nav_list: false
        },
        {
            id: 0,
            category: 'Services',
            icon_category: 'service_toolbox',
            nav_list: false
        },
        {
            id: 4,
            category: 'Infos pratiques',
            nav_item: 'Soumettre dossier',
            icon_category: 'file',
            icon: 'info',
            route: ['/web-admin.informations-pratiques-guide'],
            nav_list: false
        },
        {
            id: 5,
            nav_item: 'Calculateurs de frais',
            icon: 'calculate',
            route: ['/web-admin.informations-pratiques-calculateur-frais'],
            nav_list: false
        },
        {
            id: 5,
            nav_item: 'Comment devenir',
            icon: 'help',
            route: ['/web-admin.informations-pratiques-comment-devenir'],
            nav_list: false
        },
        {
            id: 5,
            nav_item: 'Faq',
            icon: 'quiz',
            route: ['web-admin.informations-pratiques-faq'],
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
            id: 5,
            nav_item: 'Agendas',
            icon: 'edit_calendar',
            route: ['/web-admin.actualite-agendas'],
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
            category: 'Ressources',
            nav_item: 'Publications',
            icon_category: 'library_books',
            icon: 'auto_stories',
            route: ['/web-admin.ressource-publications'],
            nav_list: false
        },
        {
            id: 3,
            nav_item: 'Liens utiles',
            icon: 'link',
            route: ['/web-admin.ressource-lien-utiles'],
            nav_list: false
        }
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

    setting_menu_list: any[] = [
        {
            id: 1,
            nav_item: 'Rôle',
            icon: 'settings',
            route: ['/web-admin.role'],
            nav_list: false
        },
        {
            id: 2,
            nav_item: 'Type services',
            icon: 'auto_stories',
            route: ['/web-admin.type-services'],
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
            id: 4,
            nav_item: 'Type publications',
            icon: 'checkbook',
            route: ['/web-admin.ressource-type-publications'],
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
        private __request_type_service: TypeServicesService,
        @Inject(PLATFORM_ID) private __plateformeId: Object,
        @Inject(DOCUMENT) private document: any,
        private __localStorage: LsSecureService,
        private __loading: NgxUiLoaderService,
        private __coockie: CookieSecureService,
        private _auth: AuthService
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
            this.unscribe.add(
                this.__request_type_service.get().subscribe(
                    {
                        next: (resp: any) => {
                            if(resp){
                                let list = resp;
                                list.forEach((el: any, indx: number) => {
                                    let data: any = {
                                        id: el.id,
                                        nav_item: el.type_service,
                                        icon: this.getIcon(el),
                                        route: ['/web-admin.service', el.type_service_code, el.type_service],
                                        nav_list: false
                                    };
                                    list[indx] = data;
                                });

                                this.sidebar_menu_list.forEach((el: any, indx: number)=>{
                                    if(el.id == 0){
                                        resp.forEach((el: any) => {
                                            this.sidebar_menu_list.splice(indx+1, 0, el);
                                        });
                                    }
                                });
                            }
                        },
                        error: (err: any) => {
                            this.__loading.stop();
                            if(err.status == 401){
                                this._auth.autoLogOut();
                            }
                        }
                    }
                )
            );
        }
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//
    //-_-// 🍀🍀
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
    //-_-// 🍀🍀
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
    //-_-// 🍀🍀
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
    //-_-// 🍀🍀
    getIcon (el: any): any{
        let icon = "";
        el.type_service = (el.type_service).toLowerCase();
        el.type_service = (el.type_service).replace('é', 'e');
        el.type_service = (el.type_service).replace('è', 'e');
        el.type_service = (el.type_service).replace('ê', 'e');

        if(el.type_service == "arbitrage" || el.type_service == "arbitrages"){
            icon = "gavel";
        }else if(el.type_service == "mediation" || el.type_service == "mediations"){
            icon = "auto_stories";
        }else if(el.type_service == "expertise" || el.type_service == "expertises"){
            icon = "assured_workload";
        }else if(el.type_service == "formation" || el.type_service == "formations"){
            icon = "book_2";
        }
        return icon;
    }
// __------__ 🍀🍀🍀🍀🍀__---   🍀 END EVENTS 🍀   ---__ 🍀🍀🍀🍀🍀__------__//


    ngOnDestroy(): void {
        if (this.intervalId !== undefined) {
            clearInterval(this.intervalId);
        }
        this.unscribe.unsubscribe();
    }
}
