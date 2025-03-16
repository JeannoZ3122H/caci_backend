import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  ConfirmModalComponent,
} from 'src/app/components/actions/confirm-modal/confirm-modal.component';
import {
  OldAccountConnectedDetectedComponent,
} from 'src/app/components/actions/old-account-connected-detected/old-account-connected-detected.component';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import { AuthService } from 'src/app/services/request/auth/auth.service';
import {
  CustomerCookieService,
} from 'src/app/services/secure/cookies/customer-cookie.service';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{

    public new_user_type: string = '';
    public email: string = '';
    public password: string = '';
    public get_email: string = '';
    public is_view_password: boolean = false;
    public is_old_connected: boolean = false;

    public data_for_any_user: any;
    protected aFormGroup!: FormGroup;
    // var recaptcha
    public siteKey: string = '6LfLZBAqAAAAAH1nS8VjmTr1hiK9yRmcBLjLfxFo';
    public token: string = '6LfLZBAqAAAAALQDUiqwHuxKiawRpsT3pmx8UzJP';


    constructor (
        private _message: MessageService,
        private _request: AuthService,
        private _loading: NgxUiLoaderService,
        private _router: Router,
        private _dialog: MatDialog,

        private _coockie: CustomerCookieService,
        private _localStorage: CustomerStorageService,
        private _coockieService: CookieService,
        private formBuilder: FormBuilder
    ){}

    ngOnInit() {
        let get_email = this._coockie.getEmailToCookie();
        if(get_email != ''){
            this.get_email = get_email;
           this.userOldConnected();
        }

        this.aFormGroup = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            recaptcha: ['', Validators.required]
        });
    }

    viewPassword(){
        this.is_view_password =! this.is_view_password;
    }

    login(){
        if(this.email == ''){
            this._message.errorField();
            return
        }
        if(this.password == ''){
            this._message.errorField();
            return
        }
        const data = {
            email: this.email,
            password: this.password
        }

        this._loading.start();
        this._request.logIn(data).subscribe(
            {
                next: (response: any )=>{
                    if (response.code == 200) {
                        this._loading.stop();
                        let token = this._coockieService.get('dragonFly');

                        this.data_for_any_user = response;
                        if(!token){
                            this._message.successOperation(response);
                            this._localStorage.setDataToStorage(response.users);
                            let user = response.users;
                            this._coockieService.set('us_id', (user.id).toString());
                            this._coockie.setEmailToCookie(response.users.email);
                            this._coockie.setKeywordToCookie(response.user_type);
                            this._coockie.setTokenToCookie(response.token);
                            setTimeout(() => {
                                this.redirectToDashboard();
                            }, 1000);

                        }else{
                            let get_user_type = (response.user_type).toLocaleLowerCase();
                            if(get_user_type == 'administrateur' || get_user_type == 'administrateurs' || get_user_type == 'admin'){
                                this.new_user_type = response.user_type;
                                this.oldConnectionDetected();
                            }
                            if(get_user_type == 'evaluateur' || get_user_type == 'evaluateurs' || get_user_type == 'evaluator'){
                                this.new_user_type = response.users.niveau_name;
                                this.oldConnectionDetected();
                            }
                        }

                    } else if (response.code == 302 || response.code == 300) {
                        this._loading.stop();
                        this._message.error(response);
                    }
                },error: (error: any)=>{
                    if (error.status == 401) {
                        localStorage.removeItem('Ramzan_Kadyrov');
                        this._coockieService.delete('dragonFly');
                        this._message.tokenExpired();
                        this._router.navigateByUrl('/');
                    }
                }
            }
        )
    }

    oldConnectionDetected(){
        const dialogRef = this._dialog.open(OldAccountConnectedDetectedComponent,
        {
            width: 'auto',
            height: 'auto',
            data: this.new_user_type,
            enterAnimationDuration: '500ms',
            exitAnimationDuration: '800ms',
        });
        dialogRef.afterClosed().subscribe({
            next: (val: any) => {
                if (val == 'confirm') {
                    this.redirectToDashboard();
                    setTimeout(() => {
                        this._dialog.closeAll();
                    }, 500);
                }else if (val == 'close'){
                    this.autoLogOut();
                    setTimeout(() => {
                        this._dialog.closeAll();
                    }, 500);
                }
            },
        });
    }

    redirectToDashboard(){
        let get_user_type_normal = this._coockie.getKeywordToCookie();
        let get_user_type = get_user_type_normal.toLocaleLowerCase();

        if(
        get_user_type == 'administrateur'
        || get_user_type == 'administrateurs'
        || get_user_type == 'admin'
        ||
        get_user_type == 'super-administrateur'
        || get_user_type == 'super-administrateurs'
        || get_user_type == 'super-admin'
        || get_user_type == 'directeur général'
        || get_user_type == 'directeur general'
        || get_user_type == 'directrice générale'
        || get_user_type == 'directrice generale'
        || get_user_type == 'dg'
        || get_user_type == 'manageur'
        || get_user_type == 'superviseur'
        || get_user_type == 'visiteur'
        ){
            this._router.navigateByUrl('/web.administration.welcome');
        }

        if(get_user_type == 'evaluateur' || get_user_type == 'evaluateurs' || get_user_type == 'evaluator'){

            let niveau_for_ev: any = this._localStorage.getDataToStorage();
            let niveau_name = niveau_for_ev.niveau_name;
            niveau_name = niveau_name.toLowerCase();

            if(niveau_name == "instructeur 1" || niveau_name == "instructeurs 1"){
                this._router.navigateByUrl('/web.first-evaluateur.welcome');

            }else if(niveau_name == "instructeur 2" || niveau_name == "instructeurs 2"){
                this._router.navigateByUrl('/web.second-evaluateur.welcome');
            }
        }
    }

    userOldConnected (){
        const dialogRef = this._dialog.open(ConfirmModalComponent, {width: '400px'});
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val == "continue") {
                    this.email = this.get_email;
                }else if(val == "close"){
                    this.email = '';
                }
            },
        });
    }

    forgotPassword(){
        localStorage.setItem('sve', 'start');
        setTimeout(() => {
            this._router.navigateByUrl('/web.forgot-password')
        }, 500);
    }

// 🫧 RECAPTCHA V2
    //
    handleReset(){

    }
    //
    handleExpire(){

    }
    //
    handleLoad(){

    }
    //
    handleSuccess(e: any){

    }

    // auto logOut
    autoLogOut(){
        let id: any = this._coockieService.get('us_id');
        this._request.logOut(id).subscribe(
            {
                next: (response: any) => {
                    if (response.code == 200) {
                        sessionStorage.clear();
                        this._coockieService.delete('dragonFly');
                        localStorage.removeItem('Ramzan_Kadyrov');

                        setTimeout(() => {
                            this._message.successOperation(this.data_for_any_user);
                            this._localStorage.setDataToStorage(this.data_for_any_user.users);
                            let user = this.data_for_any_user.users;
                            this._coockieService.set('us_id', (user.id).toString());
                            this._coockie.setEmailToCookie(this.data_for_any_user.users.email);
                            this._coockie.setKeywordToCookie(this.data_for_any_user.user_type);
                            this._coockie.setTokenToCookie(this.data_for_any_user.token);
                            setTimeout(() => {
                                this.redirectToDashboard();
                            }, 500);
                        }, 1000);
                    }
                }, error: (error: any) => {
                    this._loading.stop();
                    let _error = error.error;
                    if (error.status == 401 || _error.message == "Token has expired") {
                        localStorage.removeItem('Ramzan_Kadyrov');
                        this._coockieService.delete('us_id');
                        this._coockieService.delete('dragonFly');
                        this._message.tokenExpired();
                        this._router.navigateByUrl('/');
                    }
                }
            }
        )
    }
}
