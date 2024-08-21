import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class CookieSecureService {

    key = "eyJhbGciOiJIUzI1NiJ9.#@#eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMzQ1NzI2NSwiaWF0IjoxNzIzNDU3MjY1fQ.Ri3ynlrabjojEbjFkd2GOIO5QyQMwYMybim4oBSRuec";

    constructor(
        private cookieService: CookieService,
    ) { }


// START @ 🍀🍀 @ STORAGE @ 🍀🍀 @//

    // 🍀🍀 @ CRYPTO @ START 🍀🍀 //
        // set 🍀🍀 @
        setTokenToCookie = (token: string) => {
            let token_crypted = CryptoJS.AES.encrypt(token, this.key).toString()
            this.cookieService.set('caciz___o___n___e___s', token_crypted);
        }
        // get 🍀🍀 @
        getTokenToCookie = () => {
            const token_crypted = this.cookieService.get('caciz___o___n___e___s');
            const token_decrypted = CryptoJS.AES.decrypt(token_crypted, this.key).toString(CryptoJS.enc.Utf8);
            // console.log('c', token_crypted)
            return token_decrypted;
        }
    // 🍀🍀 END @ GUARD @ 🍀🍀 //

    // 🍀🍀 @ GUARD @ START 🍀🍀 //
        // set 🍀🍀 @
        setGuard (user: string) {
            let token_crypted = CryptoJS.AES.encrypt(user, this.key).toString()
            this.cookieService.set('g__0__', token_crypted);
        }
        // set 🍀🍀 @
        getGuard () {
            let g_0_encrypt = this.cookieService.get('g__0__');
            const g_0_decrypted = CryptoJS.AES.decrypt(g_0_encrypt, this.key).toString(CryptoJS.enc.Utf8);
            // console.log('c', token_crypted)
            return g_0_decrypted;
        }
    // 🍀🍀 END @ GUARD @ 🍀🍀 //

    // 🍀🍀 @ DELETE @ 🍀🍀 //
        // delete 🍀🍀 @
        deleteItem = (item: string) =>{
            this.cookieService.delete(item);
            return true
        }
        // delete all 🍀🍀 @
        clearAll = () =>{
            this.cookieService.deleteAll();
            return true
        }
// END @ 🍀🍀 @ STORAGE @ 🍀🍀 @//
}
