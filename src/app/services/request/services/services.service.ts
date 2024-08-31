import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiUrlService } from '../../api-url/api-url.service';
import {
  CookieSecureService,
} from '../../secure/cookie-secure/cookie-secure.service';

@Injectable({
    providedIn: 'root'
})
export class ServicesService {

    public headers: any;

    constructor(
        private __http: HttpClient,
        private __apiUrl: ApiUrlService,
        private __cookie: CookieSecureService
    ) { }

// __--__ 🍀🍀__-   🍀 START ENDPOINT HEADER XHR 🍀   -__ 🍀🍀__--__//
    getHeaders = () => {
        let get_token = this.__cookie.getTokenToCookie();
        this.headers = {
            headers: {
                'Authorization': 'Bearer ' + get_token,
                'Cache-Control': 'no-cache', 'Pragma': 'no-cache'
            }
        }
        return this.headers;
    }
// __--__ 🍀🍀__-   🍀 END ENDPOINT HEADER XHR 🍀   -__ 🍀🍀__--__//

// __--__ 🍀🍀__-   🍀 START ENDPOINT BODY XHR 🍀   -__ 🍀🍀__--__//

//🍀-_🍀 List
    get = (type_service_code: string) => {
        let url = this.__apiUrl.apiUrl + `get_current_type_service_list/${type_service_code}`;
        return this.__http.get(url, this.getHeaders());
    }

//🍀-_🍀 Add
    add = (data: any) => {
        let url = this.__apiUrl.apiUrl + "add_new_service";
        return this.__http.post(url, data, this.getHeaders());
    }

//🍀-_🍀 Update
    update = (data: any, slg: string) => {
        let url = this.__apiUrl.apiUrl + `update_current_service/${slg}`;
        return this.__http.post(url, data, this.getHeaders());
    }

//🍀-_🍀 Delete
    delete = (slg: string) => {
        let url = this.__apiUrl.apiUrl + `delete_current_service/${slg}`;
        return this.__http.delete(url, this.getHeaders());
    }
// __--__ 🍀🍀__-   🍀 END ENDPOINT BODY XHR 🍀   -__ 🍀🍀__--__//
}
