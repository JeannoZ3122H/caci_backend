import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiUrlService } from '../../api-url/api-url.service';
import {
  CookieSecureService,
} from '../../secure/cookie-secure/cookie-secure.service';

@Injectable({
  providedIn: 'root'
})
export class TypeEventsService {

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

    // 🍀🍀__-  Get All List Role 🍀
        get() {
            let url = this.__apiUrl.apiUrl + "get_list_type_events";
            return this.__http.get(url, this.getHeaders());
        }

    // 🍀🍀__-  Add New Role In List 🍀
        add(data: any) {
            let url = this.__apiUrl.apiUrl + "add_new_type_event";
            return this.__http.post(url, data, this.getHeaders());
        }

    // 🍀🍀__-  Update Role In List 🍀
        update(data: any, slg: string) {
            let url = this.__apiUrl.apiUrl + `update_current_type_event/${slg}`;
            return this.__http.put(url, data, this.getHeaders());
        }

    // 🍀🍀__-  Delete Role In List 🍀
        delete(slg: string) {
            let url = this.__apiUrl.apiUrl + `delete_current_type_event/${slg}`;
            return this.__http.delete(url, this.getHeaders());
        }
// __--__ 🍀🍀__-   🍀 END ENDPOINT BODY XHR 🍀   -__ 🍀🍀__--__//
}
