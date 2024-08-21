import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import {
  CookieSecureService,
} from '../secure/cookie-secure/cookie-secure.service';

@Injectable({
    providedIn: 'root'
})
export class ApiUrlService {

    public headers: any;

    constructor(
        private __cookie: CookieSecureService
    ){}


// __--__ 🍀🍀__-   🍀 START ENDPOINT HEADER XHR 🍀   -__ 🍀🍀__--__//
    getHeaders = () => {
        let get_token = this.__cookie.getTokenToCookie();
        // this.headers = {
        //     headers: {
        //         'Authorization': 'Bearer ' +get_token,
        //         'Cache-Control': 'no-cache',
        //         'Pragma': 'no-cache',
        //         'Content-Type': 'application/json',
        //         // 'Content-Type': 'application/x-www-form-urlencoded',
        //         // 'Access-Control-Allow-Headers': "Origin, Content-Type, Accept, Authorization",
        //         // 'Access-Control-Allow-Methods': "GET, POST, PUT, DELETE",
        //         // 'Access-Control-Allow-Credentials': true,
        //         'Access-Control-Allow-Origin': ['http://localhost:5002', 'https://caci-admin.alerte-info.net']
        //     },
        //     // withCredentials: true
        // }

        this.headers = { headers: {'Authorization': 'Bearer ' +get_token,
            'Cache-Control': 'no-cache', 'Pragma': 'no-cache' } }
        return this.headers;
    }
// __--__ 🍀🍀__-   🍀 END ENDPOINT HEADER XHR 🍀   -__ 🍀🍀__--__//



    apiUrl: any = environment.apiUrl;
    // apiUrl: any = environment_prod.apiUrl;

    // apiUrl: any = 'http://127.0.0.1:8000/api/v1/';
    // apiUrl: any = 'https://api-alerteinfo.alerteinfo-mairie.com/api/v1/';
}
