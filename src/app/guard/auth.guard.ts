import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '../services/auth/auth.service';
import {
  CookieSecureService,
} from '../services/secure/cookie-secure/cookie-secure.service';
import {
  LsSecureService,
} from '../services/secure/ls-secure/ls-secure.service';

// export const authGuard: CanActivateFn = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
//     @Injectable({ providedIn: 'root' })
//     class AuthGuard implements CanActivate {
//         canActivate(): Observable<boolean> | Promise<boolean> | boolean {
//             const token = inject(CookieService).get('caciz___o___n___e___s'); // Remplacez par le nom de votre cookie
//             if (!token) {
//                 // Token absent, rediriger vers la page de connexion
//                 return inject(Router).navigate(['/']);
//             }

//             const data: any = {
//                 email: inject(LsSecureService).getDataToStorage()?.email,
//                 password: inject(LsSecureService).getDataToStorage()?.reset_password,
//             };
//             console.log('data', data)
//             // Vérification du token auprès du backend
//             return inject(AuthService).isConnected(data).pipe(
//                 map(isValid => {
//                     console.log('isValid', isValid);
//                     if (isValid) {
//                         console.log('yes')
//                         return true;
//                     } else {
//                         console.log('no')
//                         // Token invalide, rediriger vers la page de connexion
//                         inject(CookieSecureService).clearAll();
//                         inject(LsSecureService).clearAll();
//                         inject(Router).navigate(['/']);
//                         return false;
//                     }
//                 })
//             );
//         }
//     }
//     return new AuthGuard().canActivate();
// };

export const authGuard: CanActivateFn = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
    // return true;
    let result: boolean = false;
    // if (inject(CookieSecureService).getTokenToCookie()) {
    if (inject(CookieSecureService).getTokenToCookie() && inject(LsSecureService).getDataToStorage()) {
        result = true;
    } else {
        let oldId = inject(LsSecureService).getIdDataToStorage();
        if(oldId){
            const req = inject(AuthService).resetOldConnection(oldId);
            if(req){
                inject(CookieSecureService).clearAll();
                inject(LsSecureService).cleanSession();
                inject(Router).navigate(['/web-admin.connexion']);
                result = false;
            }else{
                inject(CookieSecureService).clearAll();
                inject(LsSecureService).clearAll();
                inject(Router).navigate(['/web-admin.connexion']);
                result = false;
            }
        }else{
            inject(CookieSecureService).clearAll();
            inject(LsSecureService).clearAll();
            inject(Router).navigate(['/web-admin.connexion']);
            result = false;
        }
    }
    return result;
};


// @Injectable({ providedIn: 'root' })
// export class CanActivateauthGuard implements CanActivate {
//     constructor(
//         private cookieService: CookieService,
//         private authService: AuthService,
//         private _router: Router,
//         private _localStorage: LsSecureService,
//         private _cookie: CookieSecureService
//     ) {}

//     canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot):
//     Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
//         return new Promise(() => {
//             const token = this.cookieService.get('caciz___o___n___e___s'); // Remplacez par le nom de votre cookie
//             if (!token) {
//                 // Token absent, rediriger vers la page de connexion
//                 return this._router.navigate(['/']);
//             }
//             const data: any = {
//                 email: this._localStorage.getDataToStorage()?.email,
//                 password: this._localStorage.getDataToStorage()?.reset_password,
//             };
//             // Vérification du token auprès du backend
//             return this.authService.isConnected(data).pipe(
//                 map(isValid => {
//                     if (isValid) {
//                         return true;
//                     } else {
//                         // Token invalide, rediriger vers la page de connexion
//                         let oldId = this._localStorage.getIdDataToStorage();
//                         if(oldId){
//                             const req = this.authService.resetOldConnection(oldId);
//                             if(req){
//                                 this._cookie.clearAll();
//                                 this._localStorage.cleanSession();
//                             }else{
//                                 this._cookie.clearAll();
//                                 this._localStorage.clearAll();
//                             }
//                         }else{
//                             this._cookie.clearAll();
//                             this._localStorage.clearAll();
//                         }
//                         return this._router.navigate(['/']);
//                     }
//                 })
//             );
//         });
//     }
// }
