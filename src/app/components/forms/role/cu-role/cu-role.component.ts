import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';

import { MaterialModule } from '../../../../material-module';
import {
  RoleService,
} from '../../../../services/request/admin/role/role.service';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
    selector: 'app-cu-role',
    standalone: true,
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
    ],
    templateUrl: './cu-role.component.html',
    styleUrl: './cu-role.component.css'
})
export class CuRoleComponent implements OnInit, OnDestroy {

    private unscribe = new Subscription();

    public form_type: any = '';

    public id_current_role!: number;
    public libelle_current_role: any = '';
    public libelle: FormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9_.àâäéèêëîïôöùûüÿçÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ-]*$')
    ]);

    constructor(
        private _message: ToastService,
        private _request: RoleService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<CuRoleComponent>,
        private _loading: NgxUiLoaderService
    ) { }

    ngOnInit(): void {
        if(this.data != undefined || null){
            if(this.data.type == "add"){
                this.form_type = this.data.type;
            }else if(this.data.type == "edit"){
                this.form_type = this.data.type;
                const data = this.data.content;
                this.id_current_role = data.id;
                this.libelle_current_role = data.role;
            }
        }
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---get all admin account__ 🍀🍀
    addNewRole() {
        const data: any = {
            role: this.libelle.value
        }
        this._loading.start();
        this.unscribe.add(
            this._request.add(data).subscribe(
                {
                    next: (resp: any) => {
                        if(resp.code == 100){
                            this._loading.stop();
                            this._message.showSuccess(resp);
                            setTimeout(()=>{
                                this._dialogRef.close(true);
                            }, 1000);
                        }else if(resp.code == 302){
                            this._loading.stop();
                            this._message.showError(resp);
                        }
                    },
                    error: (err: any) => {
                        this._loading.stop();
                        console.log('server', err)
                    },
                }
            )
        )
    }
    // ---get all admin account__ 🍀🍀
    editCurrentRole() {
        const data: any = {
            role: this.libelle.value,
            id: this.id_current_role,
        }
        this._loading.start();
        this.unscribe.add(
            this._request.update(data, this.data.content.slug).subscribe(
                {
                    next: (resp: any) => {
                        if(resp.code == 200){
                            this._loading.stop();
                            this._message.showSuccess(resp);
                            setTimeout(()=>{
                                this._dialogRef.close(true);
                            }, 1000);
                        }else if(resp.code == 302){
                            this._loading.stop();
                            this._message.showError(resp);
                        }
                    },
                    error: (err: any) => {
                        this._loading.stop();
                        console.log('server', err)
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
