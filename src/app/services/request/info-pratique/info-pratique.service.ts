import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiUrlService } from '../../api-url/api-url.service';
import {
  CookieSecureService,
} from '../../secure/cookie-secure/cookie-secure.service';

@Injectable({
    providedIn: 'root'
})
export class InfoPratiqueService {

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

// 🍀--🍀 FAQ 🍀--🍀 //
    //🍀-_🍀 List
    getFaq() {
        let url = this.__apiUrl.apiUrl + "get_list_faqs";
        return this.__http.get(url, this.getHeaders());
    }
    //🍀-_🍀 Add
    addFaq(data: any) {
        let url = this.__apiUrl.apiUrl + "add_new_faq";
        return this.__http.post(url, data, this.getHeaders());
    }
    //🍀-_🍀 Update
    updateFaq(data: any, slg: string) {
        let url = this.__apiUrl.apiUrl + `update_current_faq/${slg}`;
        return this.__http.post(url, data, this.getHeaders());
    }
    //🍀-_🍀 Delete
    deleteFaq(slg: string) {
        let url = this.__apiUrl.apiUrl + `delete_current_faq/${slg}`;
        return this.__http.delete(url, this.getHeaders());
    }

// 🍀--🍀 SOUMETTRE DOCS 🍀--🍀 //
    //🍀-_🍀 List
    get() {
        let url = this.__apiUrl.apiUrl + "get_list_somettre_dossier";
        return this.__http.get(url, this.getHeaders());
    }
    //🍀-_🍀 Add
    add(data: any) {
        let url = this.__apiUrl.apiUrl + "add_new_somettre_dossier";
        return this.__http.post(url, data, this.getHeaders());
    }
    //🍀-_🍀 Update
    update(data: any, slg: string) {
        let url = this.__apiUrl.apiUrl + `update_current_somettre_dossier/${slg}`;
        return this.__http.put(url, data, this.getHeaders());
    }
    //🍀-_🍀 Delete
    delete(slg: string) {
        let url = this.__apiUrl.apiUrl + `delete_current_somettre_dossier/${slg}`;
        return this.__http.delete(url, this.getHeaders());
    }

// 🍀--🍀 DEVENIR 🍀--🍀 //
    //🍀-_🍀 List
    getDevenir() {
        let url = this.__apiUrl.apiUrl + "get_list_comment_devenir";
        return this.__http.get(url, this.getHeaders());
    }
    //🍀-_🍀 Add
    addDevenir(data: any) {
        let url = this.__apiUrl.apiUrl + "add_new_comment_devenir";
        return this.__http.post(url, data, this.getHeaders());
    }
    //🍀-_🍀 Update
    updateDevenir(data: any, slg: string) {
        let url = this.__apiUrl.apiUrl + `update_current_comment_devenir/${slg}`;
        return this.__http.post(url, data, this.getHeaders());
    }
    //🍀-_🍀 Delete
    deleteDevenir(slg: string) {
        let url = this.__apiUrl.apiUrl + `delete_current_comment_devenir/${slg}`;
        return this.__http.delete(url, this.getHeaders());
    }

// 🍀--🍀 Calculator Frais 🍀--🍀 //
    //🍀-_🍀 List
    getCalculatorFrais() {
        let url = this.__apiUrl.apiUrl + "get_list_calculator_frais";
        return this.__http.get(url, this.getHeaders());
    }
    //🍀-_🍀 Add
    addCalculatorFrais(data: any) {
        let url = this.__apiUrl.apiUrl + "add_new_calculator_frais";
        return this.__http.post(url, data, this.getHeaders());
    }
    //🍀-_🍀 Update
    updateCalculatorFrais(data: any, slg: string) {
        let url = this.__apiUrl.apiUrl + `update_current_calculator_frais/${slg}`;
        return this.__http.put(url, data, this.getHeaders());
    }
    //🍀-_🍀 Delete
    deleteCalculatorFrais(slg: string) {
        let url = this.__apiUrl.apiUrl + `delete_current_calculator_frais/${slg}`;
        return this.__http.delete(url, this.getHeaders());
    }

// 🍀--🍀 DOCUMENT 🍀--🍀 //
    //🍀-_🍀 List
    getDocumentJoinByCodeRef = (code_ref: string) =>{
        let url = this.__apiUrl.apiUrl + `get_list_document_join_by_code_ref/${code_ref}`;
        return this.__http.get(url, this.getHeaders());
    }
    //🍀-_🍀 List
    getDocumentJoin() {
        let url = this.__apiUrl.apiUrl + "get_list_document_joins";
        return this.__http.get(url, this.getHeaders());
    }
    //🍀-_🍀 Add
    addJoinDocument(data: any) {
        let url = this.__apiUrl.apiUrl + "add_new_document_join";
        return this.__http.post(url, data, this.getHeaders());
    }
    //🍀-_🍀 Update
    updateJoinDocument(data: any, slg: string) {
        let url = this.__apiUrl.apiUrl + `update_current_document_join/${slg}`;
        return this.__http.post(url, data, this.getHeaders());
    }
    //🍀-_🍀 Delete
    deleteJoinDocument(slg: string) {
        let url = this.__apiUrl.apiUrl + `delete_current_document_join/${slg}`;
        return this.__http.delete(url, this.getHeaders());
    }
// __--__ 🍀🍀__-   🍀 END ENDPOINT BODY XHR 🍀   -__ 🍀🍀__--__//
}
