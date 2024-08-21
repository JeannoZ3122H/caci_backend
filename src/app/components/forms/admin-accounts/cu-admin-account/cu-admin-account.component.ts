import {
  CommonModule,
  DOCUMENT,
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
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  interval,
  Subject,
  Subscription,
  takeUntil,
} from 'rxjs';

import { MaterialModule } from '../../../../material-module';
import {
  AdminAccountsService,
} from '../../../../services/request/admin/admin-accounts/admin-accounts.service';
import {
  RoleService,
} from '../../../../services/request/admin/role/role.service';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
    selector: 'app-cu-admin-account',
    standalone: true,
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule
    ],
    templateUrl: './cu-admin-account.component.html',
    styleUrl: './cu-admin-account.component.css'
})
export class CuAdminAccountComponent implements OnInit, OnDestroy {

    private unscribe = new Subscription();
    public form_type: any = '';

    public userLoging: any = {};
    public itemId!: number;
    public is_upload: boolean = false;
    public is_step: number = 1;

    adminForms = new FormGroup<{
        fname: FormControl<string|any>,
        lname: FormControl<string|any>,
        fonction: FormControl<string|any>,
        role: FormControl<number|any>,
        email: FormControl<string|any>,
        phone: FormControl<string|any>
    }>
    (
        {
            fname: new FormControl('', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(20),
                Validators.pattern('^[a-zA-ZÀ-ÿÇç]+(?:[ -][a-zA-ZÀ-ÿÇç]+)*$')
            ]),
            lname: new FormControl('', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(100),
                Validators.pattern('^[a-zA-ZÀ-ÿÇç]+(?:[ -][a-zA-ZÀ-ÿÇç]+)*$')
            ]),
            fonction: new FormControl('', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(50),
                Validators.pattern('^[a-zA-ZÀ-ÿÇç]+(?:[ -][a-zA-ZÀ-ÿÇç]+)*$')
            ]),
            role: new FormControl(null, [
                Validators.required,
                Validators.pattern('^[0-9]+$')
            ]),
            email: new FormControl('exemple@gmail.com', [
                Validators.required,
                Validators.email,
                Validators.minLength(5),
                Validators.maxLength(50)
            ]),
            phone: new FormControl('', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(20),
                Validators.pattern('^\\+?[1-9]\\d{1,14}$')
            ])
        }
    )

    public list_role: any[] = [];
    protected localStorage!: Storage | undefined;
    private destroy$ = new Subject<void>();
    imageUrl: string | ArrayBuffer | null = null;
    public file!: File;
    files: any = 'border: 2px dotted gray;';

    constructor(
        private _message: ToastService,
        private _request: AdminAccountsService,
        private _request_role: RoleService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject(DOCUMENT) private _document: Document,
        @Inject(PLATFORM_ID) private _plateFromeID: Document,
        private _dialogRef: MatDialogRef<CuAdminAccountComponent>,
        private _loading: NgxUiLoaderService
    ){}

    ngOnInit(): void {
        if(this.data != undefined || null){
            this.localStorage = this._document.defaultView?.localStorage;
            if(this.data.type == "add"){
                this.form_type = this.data.type;
            }else if(this.data.type == "edit"){
                this.form_type = this.data.type;
                const data = this.data.content;
                this.adminForms.setValue(
                    {
                        fname: data.fname,
                        lname: data.lname,
                        fonction: data.fonction,
                        role: data.role_id,
                        email: data.email,
                        phone: data.phone
                    }
                );
                this.imageUrl = data.admin_img;
                this.files = `height: 250px;
                    border: 2px dotted gray;
                    background: linear-gradient(190deg, rgba(4,19,61,0.5844931722689075) 12%, rgba(4,19,61,0.248358718487395) 64%), url('${this.imageUrl}')no-repeat center center;
                    background-size: 80%`;
                this.itemId = data.id;
            }
            this.getListRole();
        }
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---get role__ 🍀🍀
    getListRole(){
        // list_role
        this.unscribe.add(
        this._request_role.get().subscribe(
            {
                next: (resp: any) => {
                    if(resp){
                        this.list_role = resp;
                        if(this.data.type == "add"){
                            this.stepIs(1);
                        }
                    }
                },
                error: (err: any) => {
                    if(err){
                        this._message.showError(err);
                    }
                },
            }
        ));
    }
    // ---add__ 🍀🍀
    addNewItem() {
        const formData = new FormData();
        formData.append('fname', this.adminForms.get('fname')?.value);
        formData.append('lname', this.adminForms.get('lname')?.value);
        formData.append('fonction', this.adminForms.get('fonction')?.value);
        formData.append('role_id', this.adminForms.get('role')?.value);
        formData.append('email', this.adminForms.get('email')?.value);
        formData.append('phone', this.adminForms.get('phone')?.value);
        formData.append('file', this.file);
        this._loading.start();
        this.unscribe.add(
            this._request.add(formData).subscribe(
                {
                    next: (resp: any) => {
                        if(resp.code == 100){
                            this._loading.stop();
                            this._message.showSuccess(resp);
                            this.removeToLs();
                            setTimeout(()=>{
                                this.form_type = "details";
                                this.userLoging = resp.data;
                            }, 1000);
                        }else{
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
    // ---edit__ 🍀🍀
    editCurrentItem() {
        const formData = new FormData();
        formData.append('fname', this.adminForms.get('fname')?.value);
        formData.append('lname', this.adminForms.get('lname')?.value);
        formData.append('fonction', this.adminForms.get('fonction')?.value);
        formData.append('role_id', this.adminForms.get('role')?.value);
        formData.append('email', this.adminForms.get('email')?.value);
        formData.append('phone', this.adminForms.get('phone')?.value);
        formData.append('file', this.file);
        this._loading.start();
        this.unscribe.add(
            this._request.update(formData, this.data.content.slug).subscribe(
                {
                    next: (resp: any) => {
                        if(resp){
                            if(resp.code == 200){
                                this._loading.stop();
                                this._message.showSuccess(resp);
                                this.removeToLs();
                                setTimeout(()=>{
                                    this.close();
                                }, 1000);
                            }else{
                                this._loading.stop();
                                this._message.showError(resp);
                            }
                        }else{
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


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START EVENT 🍀   ---__ 🍀🍀🍀🍀🍀__------__//
    //
    stepIs(step: number){
        if(step){
            if(this.localStorage){
                let data = this.localStorage.getItem('ad__fs__data');
                if(!data){
                    this.saveToLs();
                    setTimeout(()=>{
                        this.is_step = step;
                    }, 2000);
                }else{
                    this.is_step = step;
                    this.getToLs(JSON.parse(data));
                    setTimeout(()=>{
                        this.saveToLs();
                    }, 2000);
                }
            }
        }
    }
    //
    saveToLs(){
        if(isPlatformBrowser(this._plateFromeID)){
            interval(1000)
            .pipe(takeUntil(this.destroy$))
            .subscribe(_=>{
                // if(e){
                    const data: any = {
                        fname: this.adminForms.value.fname,
                        lname: this.adminForms.value.lname,
                        fonction: this.adminForms.value.fonction,
                        role_id: this.adminForms.value.role,
                        email: this.adminForms.value.email,
                        phone: this.adminForms.value.phone
                    }
                    localStorage.setItem('ad__fs__data', JSON.stringify(data));
                // }
            })
        }
    }
    //
    getToLs(data: any){
        if(isPlatformBrowser(this._plateFromeID)){
            if(this.localStorage){
                this.adminForms.setValue({
                        fname: data.fname,
                        lname: data.lname,
                        fonction: data.fonction,
                        role: data.role_id,
                        email: data.email,
                        phone: data.phone
                    }
                );
            }
        }
    }
    //
    removeToLs(){
        if(isPlatformBrowser(this._plateFromeID)){
            if(this.localStorage){
                this.localStorage.removeItem('ad__fs__data');
            }
        }
    }
    //
    onFileChange(event: any) {
        const file = event.target.files[0];
        this.file = file;
        if (file) {
            this.is_upload = true;
            const reader = new FileReader();

            // Lire le fichier en tant qu'URL de données (pour les images)
            reader.onload = (e: any) => {
                this.imageUrl = e.target.result;
                this.files = `height: 250px;
                    border: 2px dotted gray;
                    background: linear-gradient(190deg, rgba(4,19,61,0.5844931722689075) 12%, rgba(4,19,61,0.248358718487395) 64%), url('${this.imageUrl}')no-repeat center center;
                    background-size: 80%`;
            };
            // Choisir le mode de lecture selon le type de fichier
            reader.readAsDataURL(file); // Pour les images
            // reader.readAsText(file); // Pour les fichiers texte
            // reader.readAsArrayBuffer(file); // Pour les fichiers binaires

        }else{
            this.is_upload = false;
        }
    }
    // close
    close(){
        this._dialogRef.close(true)
    }
// __------__ 🍀🍀🍀🍀🍀__---   🍀 END EVENT 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    ngOnDestroy(): void {
        this.unscribe.unsubscribe();
        this.destroy$.next();
        this.destroy$.complete();
        // this.removeToLs();
    }
}
