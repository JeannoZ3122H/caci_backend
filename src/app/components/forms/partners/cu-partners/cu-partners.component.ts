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
  PartnersService,
} from '../../../../services/request/admin/partners/partners.service';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
    selector: 'app-cu-partners',
    standalone: true,
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule
    ],
    templateUrl: './cu-partners.component.html',
    styleUrl: './cu-partners.component.css'
})
export class CuPartnersComponent implements OnInit, OnDestroy {

    private unscribe = new Subscription();
    public form_type: any = '';

    public userLoging: any = {};
    public itemId!: number;
    public is_upload: boolean = false;
    public is_step: number = 1;

    forms = new FormGroup<{
        description: FormControl<string | any>,
        url_site: FormControl<string | any>,
        partner: FormControl<File | any>
    }>
        (
            {
                description: new FormControl('', [
                    Validators.required,
                    Validators.minLength(4)
                ]),
                url_site: new FormControl('https://www.', [
                    Validators.required,
                ]),
                partner: new FormControl(null, [
                    Validators.required
                ]),
            }
        )

    public list_partners: any[] = [];
    protected localStorage!: Storage | undefined;
    private destroy$ = new Subject<void>();
    imageUrl: string | ArrayBuffer | null = null;
    public file!: File;
    files: any = 'border: 2px dotted gray;';

    constructor(
        private _message: ToastService,
        private _request: PartnersService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject(DOCUMENT) private _document: Document,
        @Inject(PLATFORM_ID) private _plateFromeID: Document,
        private _dialogRef: MatDialogRef<CuPartnersComponent>,
        private _loading: NgxUiLoaderService
    ) { }

    ngOnInit(): void {
        if (this.data != undefined || null) {
            this.localStorage = this._document.defaultView?.localStorage;
            if (this.data.type == "add") {
                this.form_type = this.data.type;
                this.stepIs(1);
            } else if (this.data.type == "edit") {
                this.form_type = this.data.type;
                const data = this.data.content;
                this.forms.setValue(
                    {
                        partner: data.partner,
                        description: data.description,
                        url_site: data.url_site
                    }
                );
                this.imageUrl = data.partner;
                this.files = `height: 250px;
                    border: 2px dotted gray;
                    background: linear-gradient(190deg, rgba(4,19,61,0.5844931722689075) 12%, rgba(4,19,61,0.248358718487395) 64%), url('${this.imageUrl}')no-repeat center center;
                    background-size: 80%`;
                this.itemId = data.id;
            }
        }
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---add__ 🍀🍀
    addNewItem() {
        const formData = new FormData();
        formData.append('description', this.forms.get('description')?.value);
        formData.append('url_site', this.forms.get('url_site')?.value);
        formData.append('partner', this.file);
        this._loading.start();
        this.unscribe.add(
            this._request.add(formData).subscribe(
                {
                    next: (resp: any) => {
                        if (resp.code == 100) {
                            this._loading.stop();
                            setTimeout(() => {
                                this._message.showSuccess(resp);
                                this.close();
                                this.removeToLs();
                            }, 1000);
                        } else {
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
        formData.append('description', this.forms.get('description')?.value);
        formData.append('url_site', this.forms.get('url_site')?.value);
        formData.append('partner', this.file);
        this._loading.start();
        this.unscribe.add(
            this._request.update(formData, this.data.content.slug).subscribe(
                {
                    next: (resp: any) => {
                        if (resp) {
                            if (resp.code == 200) {
                                this._loading.stop();
                                setTimeout(() => {
                                    this._message.showSuccess(resp);
                                    this.close();
                                    this.removeToLs();
                                }, 1000);
                            } else {
                                this._loading.stop();
                                this._message.showError(resp);
                            }
                        } else {
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
    stepIs(step: number) {
        if (step) {
            if (this.localStorage) {
                let data = this.localStorage.getItem('ps__fs__data');
                if (!data) {
                    this.saveToLs();
                    setTimeout(() => {
                        this.is_step = step;
                    }, 2000);
                } else {
                    this.is_step = step;
                    this.getToLs(JSON.parse(data));
                    setTimeout(() => {
                        this.saveToLs();
                    }, 2000);
                }
            }
        }
    }
    //
    saveToLs() {
        if (isPlatformBrowser(this._plateFromeID)) {
            interval(1000)
                .pipe(takeUntil(this.destroy$))
                .subscribe(_ => {
                    // if(e){
                    const data: any = {
                        description: this.forms.value.description,
                        partner: this.forms.value.partner,
                        url_site: this.forms.value.url_site
                    }
                    localStorage.setItem('ps__fs__data', JSON.stringify(data));
                    // }
                })
        }
    }
    //
    getToLs(data: any) {
        if (isPlatformBrowser(this._plateFromeID)) {
            if (this.localStorage) {
                this.forms.setValue({
                    description: data.description,
                    partner: data.partner,
                    url_site: data.url_site
                }
                );
            }
        }
    }
    //
    removeToLs() {
        if (isPlatformBrowser(this._plateFromeID)) {
            if (this.localStorage) {
                this.localStorage.removeItem('ps__fs__data');
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

        } else {
            this.is_upload = false;
        }
    }
    // close
    close() {
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

