import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ApiUrlService } from '../api-url/api-url.service';
import { LsSecureService } from '../secure/ls-secure/ls-secure.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    public headers: any;
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(
        private __http: HttpClient,
        private __apiUrl: ApiUrlService,
        private __ls: LsSecureService
    ) { }

// __--__ 🍀🍀__-   🍀 START ENDPOINT BODY XHR 🍀   -__ 🍀🍀__--__//

    // 🍀🍀__-  isLogIn 🍀
        // isConnected = (credentials: any) => {

        // }
    // 🍀🍀__-  LogIn 🍀
        logIn = (data: any) => {
            let url = this.__apiUrl.apiUrl + "login";
            return this.__http.post(url, data,this.__apiUrl.getHeaders());
        }

    // 🍀🍀__-  RefreshToken 🍀
        refreshToken = (data: any) => {
            let url = this.__apiUrl.apiUrl + "refresh_token";
            return this.__http.post(url, data,this.__apiUrl.getHeaders());
        }

    // 🍀🍀__-  RefreshToken 🍀
        resetOldConnection = (id: number) => {
            let req: boolean = false;
            let url = this.__apiUrl.apiUrl + `reset_old_connection/${id}`;
            this.__http.get(url).subscribe((resp: any) =>{
                    if(resp){
                        if(resp.code == 200){
                            req = true;
                        }else{
                            req = false;
                        }
                    }else{
                        req = false;
                    }
                },
            );
            return req;
        }
        autoLogOut = () => {
            let result;
            let id = this.__ls.getDataToStorage().id?this.__ls.getDataToStorage().id:this.__ls.getIdDataToStorage();
            if(id){
                let url = this.__apiUrl.apiUrl + `logout/${id}`;
                this.__http.get(url, this.__apiUrl.getHeaders()).subscribe(
                    {
                        next: (resp: any)=>{
                            if(resp.code == 100){
                                result = true;
                            }
                        },error: (_err: any)=>{
                            result = false;
                        }
                    }
                );
            }else{
                result = false;
            }
            return result;
        }

    // 🍀🍀__-  LogOut 🍀
        logOut = (id: number) => {
            let url = this.__apiUrl.apiUrl + `logout/${id}`;
            return this.__http.get(url, this.__apiUrl.getHeaders());
        }

    // 🍀🍀__-  check old connection 🍀
        oldConnection = () => {
            let url = this.__apiUrl.apiUrl + `check_old_connection`;
            return this.__http.get(url, this.__apiUrl.getHeaders());
            // return this._http.post(url, data, this._apiUrl.getHeaders());
        }
// __--__ 🍀🍀__-   🍀 END ENDPOINT BODY XHR 🍀   -__ 🍀🍀__--__//
}
