import { Routes } from '@angular/router';

import {
  AdminLayoutComponent,
} from './layouts/admin-layout/admin-layout.component';
import {
  AuthentificationLayoutComponent,
} from './layouts/authentification-layout/authentification-layout.component';
import { OoopsComponent } from './pages/ooops/ooops.component';
import {
  UnauthorizedComponent,
} from './pages/unauthorized/unauthorized.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "",
        pathMatch: "full"
    },
    {
        path: "",
        component: AuthentificationLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: () => import("./layouts/authentification-layout/authentification-layout.module").then(m => m.AuthentificationLayoutModule)
            }
        ]
    },
    {
        path: "",
        component: AdminLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: () => import("./layouts/admin-layout/admin-layout.module").then(m => m.AdminLayoutModule)
            }
        ]
    },
    // {
    //     path: "",
    //     component: ErrorLayoutComponent,
    //     children: [
    //         {
    //             path: "",
    //             loadChildren: () => import("./layouts/error-layout/error-layout.module").then(m => m.ErrorLayoutModule)
    //         }
    //     ],
    // },
    {
        path: "404-error",
        component: OoopsComponent,
        data: { title: 'Page non trouvée' }
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent,
        data: { title: 'Page non autorisée' }
    },
    {
        path: "*",
        redirectTo: "/404-error"
    },
    {
        path: "**",
        redirectTo: "/404-error"
    }
];
