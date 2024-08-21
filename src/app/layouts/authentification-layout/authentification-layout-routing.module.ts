import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import {
  ForgetPasswordComponent,
} from '../../pages/auth/forget-password/forget-password.component';
import { LoginComponent } from '../../pages/auth/login/login.component';
import {
  RegisterMeComponent,
} from '../../pages/auth/register-me/register-me.component';
import {
  AuthentificationLayoutComponent,
} from './authentification-layout.component';

const routes: Routes = [

// @@@@ 🍀🍀 LOGIN
    {
        path: 'web-admin.connexion',
        component: LoginComponent,
        data: { title: 'CONNEXION' },
        resolve: {
            layout: () => import('../authentification-layout/authentification-layout.module').then(() => AuthentificationLayoutComponent)
        }
    },

// @@@@ 🍀🍀 FORGET PASSWORD
    {
        path: 'web-admin.mot-de-passe-oublie',
        component: ForgetPasswordComponent,
        data: { title: 'MOT DE PASSE OUBLIÉ' },
        resolve: {
            layout: () => import('../authentification-layout/authentification-layout.module').then(() => AuthentificationLayoutComponent)
        }
    },

// @@@@ 🍀🍀 REGISTER ME
    {
        path: "web.caci.faire-une-demande",
        component: RegisterMeComponent,
        data: { title: 'M\'ENREGISTRER' },
        resolve: {
            layout: () => import('../authentification-layout/authentification-layout.module').then(() => AuthentificationLayoutComponent)
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthentificationLayoutRoutingModule { }
