import {
  DOCUMENT,
  isPlatformBrowser,
} from '@angular/common';
import {
  Inject,
  Injectable,
  PLATFORM_ID,
} from '@angular/core';

import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class LsSecureService {
    key = "eyJhbGciOiJIUzI1NiJ9.##eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMzQ1NzI2NSwiaWF0IjoxNzIzNDU3MjY1fQ.Ri3ynlrabjojEbjFkd2GOIO5QyQMwYMybim4oBSRuec";
    public localStorage!: Storage | any;

    constructor(
        @Inject(PLATFORM_ID) private __plateformeId: Object,
        @Inject(DOCUMENT) private __document: Document,
    ){}


// START @ 🍀🍀 @ COOKIE @ 🍀🍀 @//

    // 🍀🍀 @ CRYPTO @ START 🍀🍀 //
        // set 🍀🍀 @
        setDataToStorage = (data: any) => {
            if(isPlatformBrowser(this.__plateformeId)){
                this.localStorage = this.__document.defaultView?.localStorage;
                if(this.localStorage){
                    let resp: any;
                    let data_crypted = CryptoJS.AES.encrypt(JSON.stringify(data), this.key).toString();
                    resp = this.localStorage.setItem('o___r___i___g___i___n___s', data_crypted)
                    return resp;
                }
            }
        }
        // get 🍀🍀 @
        getDataToStorage = () => {
            if(isPlatformBrowser(this.__plateformeId)){
                this.localStorage = this.__document.defaultView?.localStorage;
                if(this.localStorage){
                    const data_crypted: any = this.localStorage.getItem('o___r___i___g___i___n___s');
                    let data_decrypted: any = {};
                    if(data_crypted != null || undefined) {
                        data_decrypted = CryptoJS.AES.decrypt(data_crypted, this.key).toString(CryptoJS.enc.Utf8);
                        // console.log('en', data_decrypted)]
                        data_decrypted = JSON.parse(data_decrypted);
                    }else{data_decrypted = null};
                    return data_decrypted;
                }
            }
        }

        // set old user connected id 🍀🍀 @
        setIdDataToStorage = (user_id: any) => {
            if(isPlatformBrowser(this.__plateformeId)){
                this.localStorage = this.__document.defaultView?.localStorage;
                if(this.localStorage){
                    let resp: any;
                    let data_crypted = CryptoJS.AES.encrypt(JSON.stringify(user_id), this.key).toString();
                    resp = this.localStorage.setItem('u___i___o____c', data_crypted)
                    return resp;
                }
            }
        }
        // get 🍀🍀 @
        getIdDataToStorage = () => {
            if(isPlatformBrowser(this.__plateformeId)){
                this.localStorage = this.__document.defaultView?.localStorage;
                if(this.localStorage){
                    const data_crypted: any = this.localStorage.getItem('u___i___o____c');
                    let data_decrypted: any = {};
                    if(data_crypted != null || undefined) {
                        data_decrypted = CryptoJS.AES.decrypt(data_crypted, this.key).toString(CryptoJS.enc.Utf8);
                        // console.log('en', data_decrypted)]
                        const data = JSON.parse(data_decrypted);
                        const oldId = data.split(' ')[1];
                        data_decrypted = Number(oldId);
                    }else{data_decrypted = null};
                    return data_decrypted;
                }
            }
        }
    // 🍀🍀 END @ CRYPTO @ 🍀🍀 //

    // 🍀🍀 @ DELETE @ 🍀🍀 //
        removeItem = (item: string) =>{
            if(isPlatformBrowser(this.__plateformeId)){
                this.localStorage = this.__document.defaultView?.localStorage;
                if(this.localStorage){
                    this.localStorage.removeItem(item);
                }
            }
            return true;
        }
        clearAll = () =>{
            if(isPlatformBrowser(this.__plateformeId)){
                this.localStorage = this.__document.defaultView?.localStorage;
                if(this.localStorage){
                    this.localStorage.clear();
                }
            }
            return true;
        }
        cleanSession = () =>{
            if(isPlatformBrowser(this.__plateformeId)){
                this.localStorage = this.__document.defaultView?.localStorage;
                if(this.localStorage){
                    this.localStorage.removeItem('o___r___i___g___i___n___s');
                    this.localStorage.removeItem('u___i___o____c');
                }
            }
            return true;
        }
// END @ 🍀🍀 @ STORAGE @ 🍀🍀 @//
}
