import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { authGuard } from '../../guard/auth.guard';
import {
  AgendasUsComponent,
} from '../../pages/admin-pages/actualites/agendas-us/agendas-us.component';
import {
  AdminAccountsComponent,
} from '../../pages/admin-pages/admin-accounts/admin-accounts.component';
import {
  BannerUsComponent,
} from '../../pages/admin-pages/banner-us/banner-us.component';
import {
  DashboardComponent,
} from '../../pages/admin-pages/dashboard/dashboard.component';
import {
  EventsUsComponent,
} from '../../pages/admin-pages/events-us/events-us.component';
import {
  HistoriqueUsComponent,
} from '../../pages/admin-pages/historique-us/historique-us.component';
import {
  CalculateurFraisComponent,
} from '../../pages/admin-pages/info-pratique/calculateur-frais/calculateur-frais.component';
import {
  DevenirArbitreComponent,
} from '../../pages/admin-pages/info-pratique/devenir-arbitre/devenir-arbitre.component';
import {
  FaqComponent,
} from '../../pages/admin-pages/info-pratique/faq/faq.component';
import {
  SoumettreDocsComponent,
} from '../../pages/admin-pages/info-pratique/soumettre-docs/soumettre-docs.component';
import {
  MessagerieComponent,
} from '../../pages/admin-pages/messagerie/messagerie.component';
import {
  MissionUsComponent,
} from '../../pages/admin-pages/mission-us/mission-us.component';
import {
  NewslettersComponent,
} from '../../pages/admin-pages/newsletters/newsletters.component';
import {
  OrganizationUsComponent,
} from '../../pages/admin-pages/organization-us/organization-us.component';
import {
  PartnersUsComponent,
} from '../../pages/admin-pages/partners-us/partners-us.component';
import {
  LiensUtilesUsComponent,
} from '../../pages/admin-pages/resources/liens-utiles-us/liens-utiles-us.component';
import {
  PublicationsUsComponent,
} from '../../pages/admin-pages/resources/publications-us/publications-us.component';
import { RoleComponent } from '../../pages/admin-pages/role/role.component';
import {
  ServicesComponent,
} from '../../pages/admin-pages/services/services.component';
import {
  StatistiqueComponent,
} from '../../pages/admin-pages/statistique/statistique.component';
import {
  TeamsUsComponent,
} from '../../pages/admin-pages/teams-us/teams-us.component';
import {
  TermsAndConditionsComponent,
} from '../../pages/admin-pages/terms-and-conditions/terms-and-conditions.component';
import {
  TestimonialsComponent,
} from '../../pages/admin-pages/testimonials/testimonials.component';
import {
  TypeEventComponent,
} from '../../pages/admin-pages/type-event/type-event.component';
import {
  TypeServicesComponent,
} from '../../pages/admin-pages/type-services/type-services.component';
import {
  TypesPublicationsComponent,
} from '../../pages/admin-pages/types-publications/types-publications.component';
import {
  SlideUneImgComponent,
} from '../../pages/admin-pages/welcome-content/slide-une-img/slide-une-img.component';
import { AdminLayoutComponent } from './admin-layout.component';

const routes: Routes = [

// _-__--__ 🥝🥝 GENERALITES ROUTES 🥝
    {
        path: 'web-admin.dashboard',
        component: DashboardComponent,
        data: { title: 'TABLEAU DE BORD' },
        // resolve: {
        //     layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        // },
        canActivate: [authGuard],
    },
    {
        path: 'web-admin.message-received',
        component: MessagerieComponent,
        data: { title: 'MESSAGERIE' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard],
    },
// _-__--__ 🥝🥝

// _-__--__ 🥝🥝 PAGES NAVBAR ROUTES 🥝
    {
        path: 'web-admin.terms-and-policy',
        component: TermsAndConditionsComponent,
        data: { title: 'TERMES AND CONDITIONS' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard],
    },
// _-__--__ 🥝🥝

// _-__--__ 🥝🥝 PAGES ROUTES 🥝
    {
        path: 'web-admin.slide-une-img',
        component: SlideUneImgComponent,
        data: { title: 'IMAGE ACCUEIL' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard],
    },
    {
        path: 'web-admin.testimonials',
        component: TestimonialsComponent,
        data: { title: 'NOS TÉMOIGNAGES' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        }
    },
// _-__--__ 🥝🥝

// _-__--__ 🥝🥝 COMPTE ROUTES 🥝
    {
        path: 'web-admin.account-admin',
        component: AdminAccountsComponent,
        data: { title: 'ACCOUNT ADMIN' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard]
    },
    {
        path: 'web-admin.account-teams-us',
        component: TeamsUsComponent,
        data: { title: 'NOTRE ÉQUIPE' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard],
    },
// _-__--__ 🥝🥝

// _-__--__ 🥝🥝 ABOUT ROUTES 🥝
    {
        path: 'web-admin.about-historiques',
        component: HistoriqueUsComponent,
        data: { title: 'HISTORIQUES' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard],
    },
    {
        path: 'web-admin.about-missions',
        component: MissionUsComponent,
        data: { title: 'MISSIONS' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard],
    },
    {
        path: 'web-admin.about-organisations',
        component: OrganizationUsComponent,
        data: { title: 'ORGANISATIONS' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard],
    },
// _-__--__ 🥝🥝

// _-__--__ 🥝🥝 SERVICES ROUTES 🥝
    {
        path: 'web-admin.type-services',
        component: TypeServicesComponent,
        data: { title: 'TYPES SERVICES' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard],
    },
    {
        path: 'web-admin.service/:type_service_code/:type_service',
        component: ServicesComponent,
        data: { title: 'SERVICES | ' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard],
    },
// _-__--__ 🥝🥝

// _-__--__ 🥝🥝 EVENEMENTS ROUTES 🥝
    {
        path: 'web-admin.banner-event',
        component: BannerUsComponent,
        data: { title: 'BANNIÈRE PUBLICITAIRE' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard],
    },
    {
        path: 'web-admin.news-event',
        component: EventsUsComponent,
        data: { title: 'ACTUALITÉS' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard],
    },
// _-__--__ 🥝🥝

// _-__--__ 🥝🥝 INFORMATIONS PRATIQUES ROUTES 🥝
    {
        path: 'web-admin.informations-pratiques-guide',
        component: SoumettreDocsComponent,
        data: { title: 'SOMETTRE UN DOSSIER' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard],
    },
    {
        path: 'web-admin.informations-pratiques-calculateur-frais',
        component: CalculateurFraisComponent,
        data: { title: 'CALCULATEURS DE FRAIS' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard],
    },
    {
        path: 'web-admin.informations-pratiques-comment-devenir',
        component: DevenirArbitreComponent,
        data: { title: 'COMMENT DEVENIR ARBITRE, MEDIATEUR, EXPERT' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard],
    },
    {
        path: 'web-admin.informations-pratiques-faq',
        component: FaqComponent,
        data: { title: 'Faq' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard],
    },
// _-__--__ 🥝🥝

// _-__--__ 🥝🥝 PARAMETRES DU SITE ROUTES 🥝
    {
        path: 'web-admin.role',
        component: RoleComponent,
        data: { title: 'RÔLE' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard],
    },
    {
        path: 'web-admin.type-events',
        component: TypeEventComponent,
        data: { title: 'TYPE ÉVÈNEMENT' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard],
    },
    {
        path: 'web-admin.partners-us',
        component: PartnersUsComponent,
        data: { title: 'PARTENAIRE' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard],
    },
    {
        path: 'web-admin.newsletters',
        component: NewslettersComponent,
        data: { title: 'NEWSLETTER' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard],
    },
    {
        path: 'web-admin.historics-site',
        component: HistoriqueUsComponent,
        data: { title: 'HISTORIQUE' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard],
    },
    {
        path: 'web-admin.statistics-us',
        component: StatistiqueComponent,
        data: { title: 'STATISTIQUES' },
        resolve: {
            layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
        },
        canActivate: [authGuard],
    },
// _-__--__ 🥝🥝

// _-__--__ 🥝🥝 AGENDAS ROUTES 🥝
{
    path: 'web-admin.actualite-agendas',
    component: AgendasUsComponent,
    data: { title: 'AGENDA' },
    resolve: {
        layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
    },
    canActivate: [authGuard],
},
// _-__--__ 🥝🥝

// _-__--__ 🥝🥝 RESSOURCES ROUTES 🥝
{
    path: 'web-admin.ressource-type-publications',
    component: TypesPublicationsComponent,
    data: { title: 'TYPE DE PUBLICATIONS' },
    resolve: {
        layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
    },
    canActivate: [authGuard],
},
{
    path: 'web-admin.ressource-publications',
    component: PublicationsUsComponent,
    data: { title: 'PUBLICATIONS' },
    resolve: {
        layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
    },
    canActivate: [authGuard],
},
{
    path: 'web-admin.ressource-lien-utiles',
    component: LiensUtilesUsComponent,
    data: { title: 'LIENS UTILES' },
    resolve: {
        layout: () => import('../admin-layout/admin-layout.module').then(() => AdminLayoutComponent)
    },
    canActivate: [authGuard],
},
// _-__--__ 🥝🥝

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
