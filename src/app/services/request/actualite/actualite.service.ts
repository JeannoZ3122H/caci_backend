import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiUrlService } from '../../api-url/api-url.service';
import {
  CookieSecureService,
} from '../../secure/cookie-secure/cookie-secure.service';

@Injectable({
  providedIn: 'root'
})
export class ActualiteService {
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

// 🍀_ _--_ _🍀 AGENDAS REQUEST 🍀_ _--_ _🍀 START
// 🍀🍀__-  Add New In List 🍀
    addAgenda = (data: any) =>{
        let url = this.__apiUrl.apiUrl + "add_new_agenda";
        return this.__http.post(url, data, this.__apiUrl.getHeaders());
    }

// 🍀🍀__-  Update In List 🍀
    updateAgenda = (data: any, slg: string) =>{
        let url = this.__apiUrl.apiUrl + `update_current_agenda/${slg}`;
        return this.__http.post(url, data, this.__apiUrl.getHeaders());
    }

// 🍀🍀__-  Get All List 🍀
    getAgenda = () =>{
        let url = this.__apiUrl.apiUrl + "get_list_agendas";
        return this.__http.get(url, this.getHeaders());
    }

// 🍀🍀__-  Delete In List 🍀
    deleteAgenda = (slg: string) =>{
        let url = this.__apiUrl.apiUrl + `delete_current_agenda/${slg}`;
        return this.__http.delete(url, this.getHeaders());
    }
// 🍀_ _--_ _🍀 AGENDAS REQUEST 🍀_ _--_ _🍀 END

// __--__ 🍀🍀__-   🍀 END ENDPOINT BODY XHR 🍀   -__ 🍀🍀__--__//

}
