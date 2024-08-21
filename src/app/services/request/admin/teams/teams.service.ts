import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiUrlService } from '../../../api-url/api-url.service';
import {
  CookieSecureService,
} from '../../../secure/cookie-secure/cookie-secure.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

    public headers: any;

    constructor(
        private __http: HttpClient,
        private __apiUrl: ApiUrlService,
        private __cookie: CookieSecureService
    ) { }

// __--__ 🍀🍀__-   🍀 START ENDPOINT HEADER XHR 🍀   -__ 🍀🍀__--__//
    getHeaders = () => {
        let get_token = this.__cookie.getTokenToCookie();
        this.headers = { headers: {'Authorization': 'Bearer ' +get_token,
            'Cache-Control': 'no-cache', 'Pragma': 'no-cache' } }
        return this.headers;
    }
// __--__ 🍀🍀__-   🍀 END ENDPOINT HEADER XHR 🍀   -__ 🍀🍀__--__//

// __--__ 🍀🍀__-   🍀 START ENDPOINT BODY XHR 🍀   -__ 🍀🍀__--__//

    // 🍀🍀__-  Get All List 🍀// 
        get() {
            let url = this.__apiUrl.apiUrl + "get_list_persons";
            return this.__http.get(url, this.__apiUrl.getHeaders());
        }

    // 🍀🍀__-  Add New Item In List 🍀
        add(data: any) {
            let url = this.__apiUrl.apiUrl + "add_new_person";
            return this.__http.post(url, data, this.__apiUrl.getHeaders());
        }

    // 🍀🍀__-  Update Item In List 🍀
        update(data: any, slg: string) {
            let url = this.__apiUrl.apiUrl + `update_current_person/${slg}`;
            return this.__http.post(url, data, this.__apiUrl.getHeaders());
        }

    // 🍀🍀__-  Delete Item In List 🍀
        delete(slg: string) {
            let url = this.__apiUrl.apiUrl + `delete_current_person/${slg}`;
            return this.__http.delete(url, this.__apiUrl.getHeaders());
        }

    // 🍀🍀__-  Delete Item In List 🍀
        checkUsersStatus(slg: string) {
            let url = this.__apiUrl.apiUrl + `check_status_current_person/${slg}`;
            return this.__http.put(url, this.__apiUrl.getHeaders());
        }
// __--__ 🍀🍀__-   🍀 END ENDPOINT BODY XHR 🍀   -__ 🍀🍀__--__//
}
