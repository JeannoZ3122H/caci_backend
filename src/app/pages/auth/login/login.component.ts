import {
  CommonModule,
  isPlatformBrowser,
} from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Router,
  RouterModule,
} from '@angular/router';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';

import { MaterialModule } from '../../../material-module';
import { AuthService } from '../../../services/auth/auth.service';
import {
  CookieSecureService,
} from '../../../services/secure/cookie-secure/cookie-secure.service';
import {
  LsSecureService,
} from '../../../services/secure/ls-secure/ls-secure.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy{

// @@@@@@@@@@@@@@@@@ 🍄🍄🍄 START VARIABLE @@@@@@@@@@@@@@@@@ 🍄🍄🍄 START //

    protected subscription: Subscription = new Subscription();

// 🍄🍄 GLOBAL
    // forms
    hide = true;
    myForms: FormGroup = new FormGroup
    <{
        email: FormControl<string | null>;
        password: FormControl<string | null>;
    }>
    (
        {
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)])
        }
    )

    constructor(
        private _request: AuthService,
        private _loading: NgxUiLoaderService,
        private _message: ToastService,
        private _localStorage: LsSecureService,
        private _coockie: CookieSecureService,
        @Inject(PLATFORM_ID) private _plateformeId: Object,
        private _router: Router
    ){}


    ngOnInit(): void {

    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // --- send __ 🍀🍀
    login(){
        const data: any = {
            email: this.myForms.get('email')?.value,
            password: this.myForms.get('password')?.value,
        };
        this._loading.start();
        this.subscription.add(
            this._request.logIn(data).subscribe(
                {
                    next: (resp: any) =>{
                        // console.log('resp', resp)
                        if(resp){
                            if(resp.code == 100){
                                this._localStorage.setIdDataToStorage(`-1-2-3-1- ${resp.users.id} -2-6-4-1-`);
                                this._coockie.setTokenToCookie(resp.token);
                                this._localStorage.setDataToStorage(resp.users);
                                this._coockie.setGuard('rien de bon');

                                if(isPlatformBrowser(this._plateformeId)){
                                    setTimeout(() => {
                                        this._loading.stop();
                                        this._message.showSuccess(resp);
                                        this._router.navigate(['/web-admin.dashboard'])
                                        // this._router.navigate(['/web-admin.terms-and-policy'])
                                    }, 1000);
                                }
                            }else{
                                this._loading.stop();
                                this._message.showError(resp);
                            }
                        }else{
                            this._loading.stop();
                            this._message.showError(resp);
                        }
                    }, error: (err: any) =>{
                        this._loading.stop();
                        this._message.showError(err);
                        if(err){

                        }
                    }
                }
            )
        );
    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 END REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//



// __------__ 🍀🍀🍀🍀🍀__---   🍀 START EVENTS 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // --- get __ 🍀🍀


// __------__ 🍀🍀🍀🍀🍀__---   🍀 END EVENTS 🍀   ---__ 🍀🍀🍀🍀🍀__------__//


    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

