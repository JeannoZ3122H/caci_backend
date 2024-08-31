import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { MaterialModule } from '../../../../material-module';
import { AuthService } from '../../../../services/auth/auth.service';
import {
  TypeServicesService,
} from '../../../../services/request/type-services/type-services.service';
import {
  LsSecureService,
} from '../../../../services/secure/ls-secure/ls-secure.service';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
    selector: 'app-cu-type-services',
    standalone: true,
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
    ],
    templateUrl: './cu-type-services.component.html',
    styleUrl: './cu-type-services.component.css'
})
export class CuTypeServicesComponent implements OnInit, OnDestroy {

    private unscribe = new Subscription();

    public form_type: any = '';
    public forms: FormGroup = new FormGroup<{
        type_service: FormControl<string | null>
        description: FormControl<string | null>
    }>(
        {
            type_service: new FormControl('', [
                Validators.required,
                Validators.minLength(4),
                Validators.pattern('^[a-zA-Z0-9_.àâäéèêëîïôöùûüÿçÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ-]*$')
            ]),
            description: new FormControl('', [
                Validators.required,
                Validators.minLength(4)
            ])
        }
    );

    constructor(
        private _message: ToastService,
        private _request: TypeServicesService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<CuTypeServicesComponent>,
        private _auth: AuthService,
        private _ls: LsSecureService
    ){}

    ngOnInit(): void {
        if (this.data != undefined || null) {
            if (this.data.type == "add") {
                this.form_type = this.data.type;
            } else if (this.data.type == "edit") {
                this.form_type = this.data.type;
                const data = this.data.content;
                this.forms.setValue({
                    type_service: data.type_service,
                    description: data.description
                });
            }
        }
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---add__ 🍀🍀
    add() {
        const data: any = {
            author_id: this._ls.getDataToStorage()?.id,
            type_service: this.forms.get('type_service')?.value,
            description: this.forms.get('description')?.value,
        }
        this.unscribe.add(
            this._request.add(data).subscribe(
                {
                    next: (resp: any) => {
                        if(resp.code == 100){
                            this._message.showSuccess(resp);

                            setTimeout(() => {
                                this._dialogRef.close(true);
                            }, 2000);
                        }
                    },
                    error: (err: any) => {
                        if(err.status == 401){
                            this._auth.autoLogOut();
                        }
                    },
                }
            )
        )
    }
    // ---get all admin account__ 🍀🍀
    edit() {
        const data: any = {
            author_id: this._ls.getDataToStorage()?.id,
            type_service: this.forms.get('type_service')?.value,
            description: this.forms.get('description')?.value,
        }
        this.unscribe.add(
            this._request.update(data, this.data.content.slug).subscribe(
                {
                    next: (resp: any) => {
                        if(resp.code == 200){
                            this._message.showSuccess(resp);

                            setTimeout(() => {
                                this._dialogRef.close(true);
                            }, 2000);
                        }
                    },
                    error: (err: any) => {
                        if(err.status == 401){
                            this._auth.autoLogOut();
                        }
                    },
                }
            )
        )
    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 END REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    ngOnDestroy(): void {
        this.unscribe.unsubscribe();
    }
}

