import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiUrlService } from '../../../../api-url/api-url.service';

@Injectable({
  providedIn: 'root'
})
export class ExpertiseService {

    constructor(
        private __http: HttpClient,
        private __apiUrl: ApiUrlService
    ) { }


// __--__ 🍀🍀__-   🍀 START ENDPOINT BODY XHR 🍀   -__ 🍀🍀__--__//

    // 🍀🍀__-  Get All List Role 🍀
        get() {
            let url = this.__apiUrl.apiUrl + "get_list_expertises";
            return this.__http.get(url, this.__apiUrl.getHeaders());
        }

    // 🍀🍀__-  Add New Role In List 🍀
        add(data: any) {
            let url = this.__apiUrl.apiUrl + "add_new_expertise";
            return this.__http.post(url, data, this.__apiUrl.getHeaders());
        }

    // 🍀🍀__-  Update Role In List 🍀
        update(data: any, slg: string) {
            let url = this.__apiUrl.apiUrl + `update_current_expertise/${slg}`;
            return this.__http.put(url, data, this.__apiUrl.getHeaders());
        }

    // 🍀🍀__-  Delete Role In List 🍀
        delete(slg: string) {
            let url = this.__apiUrl.apiUrl + `delete_current_expertise/${slg}`;
            return this.__http.delete(url, this.__apiUrl.getHeaders());
        }
// __--__ 🍀🍀__-   🍀 END ENDPOINT BODY XHR 🍀   -__ 🍀🍀__--__//
}
