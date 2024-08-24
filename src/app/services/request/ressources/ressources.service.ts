import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiUrlService } from '../../api-url/api-url.service';
import {
  CookieSecureService,
} from '../../secure/cookie-secure/cookie-secure.service';

@Injectable({
  providedIn: 'root'
})
export class RessourcesService {
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

// 🍀_ _--_ _🍀 TYPES PUBLICATIONS REQUEST 🍀_ _--_ _🍀 START
    // 🍀🍀__-  Add New In List 🍀
        addTypePublication = (data: any) =>{
            let url = this.__apiUrl.apiUrl + "add_new_type_publication";
            return this.__http.post(url, data, this.__apiUrl.getHeaders());
        }

    // 🍀🍀__-  Update In List 🍀
        updateTypePublication = (data: any, slg: string) =>{
            let url = this.__apiUrl.apiUrl + `update_current_type_publication/${slg}`;
            return this.__http.post(url, data, this.__apiUrl.getHeaders());
        }

    // 🍀🍀__-  Get All List 🍀
        getTypePublication = () =>{
            let url = this.__apiUrl.apiUrl + "get_list_type_publications";
            return this.__http.get(url, this.getHeaders());
        }

    // 🍀🍀__-  Delete In List 🍀
        deleteTypePublication = (slg: string) =>{
            let url = this.__apiUrl.apiUrl + `delete_current_type_publication/${slg}`;
            return this.__http.delete(url, this.getHeaders());
        }
// 🍀_ _--_ _🍀 TYPES PUBLICATIONS REQUEST 🍀_ _--_ _🍀 END


// 🍀_ _--_ _🍀 PUBLICATIONS REQUEST 🍀_ _--_ _🍀 START
    // 🍀🍀__-  Add New In List 🍀
    addPublication = (data: any) =>{
        let url = this.__apiUrl.apiUrl + "add_new_publication";
        return this.__http.post(url, data, this.__apiUrl.getHeaders());
    }

// 🍀🍀__-  Update In List 🍀
    updatePublication = (data: any, slg: string) =>{
        let url = this.__apiUrl.apiUrl + `update_current_publication/${slg}`;
        return this.__http.post(url, data, this.__apiUrl.getHeaders());
    }

// 🍀🍀__-  Get All List 🍀
    getPublication = () =>{
        let url = this.__apiUrl.apiUrl + "get_list_publications";
        return this.__http.get(url, this.getHeaders());
    }

// 🍀🍀__-  Delete In List 🍀
    deletePublication = (slg: string) =>{
        let url = this.__apiUrl.apiUrl + `delete_current_publication/${slg}`;
        return this.__http.delete(url, this.getHeaders());
    }
// 🍀_ _--_ _🍀 PUBLICATIONS REQUEST 🍀_ _--_ _🍀 END


// 🍀_ _--_ _🍀 LIENS UTILES REQUEST 🍀_ _--_ _🍀 START
    // 🍀🍀__-  Add New In List 🍀
    addLienUtile = (data: any) =>{
        let url = this.__apiUrl.apiUrl + "add_new_lien_utile";
        return this.__http.post(url, data, this.__apiUrl.getHeaders());
    }

// 🍀🍀__-  Update In List 🍀
    updateLienUtile = (data: any, slg: string) =>{
        let url = this.__apiUrl.apiUrl + `update_current_lien_utile/${slg}`;
        return this.__http.post(url, data, this.__apiUrl.getHeaders());
    }

// 🍀🍀__-  Get All List 🍀
    getLienUtile = () =>{
        let url = this.__apiUrl.apiUrl + "get_list_lien_utiles";
        return this.__http.get(url, this.getHeaders());
    }

// 🍀🍀__-  Delete In List 🍀
    deleteLienUtile = (slg: string) =>{
        let url = this.__apiUrl.apiUrl + `delete_current_lien_utile/${slg}`;
        return this.__http.delete(url, this.getHeaders());
    }
// 🍀_ _--_ _🍀 LIENS UTILES REQUEST 🍀_ _--_ _🍀 END

// __--__ 🍀🍀__-   🍀 END ENDPOINT BODY XHR 🍀   -__ 🍀🍀__--__//
}
