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
    selector: 'app-cu-agendas',
    standalone: true,
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule
    ],
    templateUrl: './cu-agendas.component.html',
    styleUrl: './cu-agendas.component.css'
})
export class CuAgendasComponent implements OnInit, OnDestroy {

    private unscribe = new Subscription();
    public form_type: any = '';

    public userLoging: any = {};
    public itemId!: number;
    public is_upload: boolean = false;
    public is_step: number = 1;

    forms = new FormGroup<{
        price: FormControl<string | any>,
        title_event: FormControl<string | any>,
        description_event: FormControl<string | any>,
        date_start_event: FormControl<string | any>,
        date_end_event: FormControl<string | any>,
        status_enter_event: FormControl<string | any>,
        address_event: FormControl<string | any>,
        localisation_event: FormControl<string | any>,
        illusration_event: FormControl<File | any>
    }>({
        price: new FormControl('', [
            Validators.required,
            Validators.minLength(4)
        ]),
        title_event: new FormControl('', [
            Validators.required,
            Validators.minLength(4)
        ]),
        description_event: new FormControl('', [
            Validators.required,
        ]),
        date_start_event: new FormControl('', [
            Validators.required,
        ]),
        date_end_event: new FormControl('', [
            Validators.required,
        ]),
        status_enter_event: new FormControl(true, [
            Validators.required,
        ]),
        address_event: new FormControl('', [
            Validators.required,
        ]),
        localisation_event: new FormControl('', [
            Validators.required,
        ]),
        illusration_event: new FormControl(null, [
            Validators.required
        ]),
    });

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
        private _dialogRef: MatDialogRef<CuAgendasComponent>,
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
                        title_event: data.title_event,
                        description_event: data.description_event,
                        date_start_event: data.date_start_event,
                        date_end_event: data.date_end_event,
                        status_enter_event: data.status_enter_event,
                        address_event: data.address_event,
                        localisation_event: data.localisation_event,
                        price: data.price,
                        illusration_event: data.illusration_event,
                    }
                );
                this.imageUrl = data.illusration_event;
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
        formData.append('title_event', this.forms.get('title_event')?.value);
        formData.append('description_event', this.forms.get('description_event')?.value);
        formData.append('date_start_event', this.forms.get('date_start_event')?.value);
        formData.append('date_end_event', this.forms.get('date_end_event')?.value);
        formData.append('status_enter_event', this.forms.get('status_enter_event')?.value);
        formData.append('address_event', this.forms.get('address_event')?.value);
        formData.append('localisation_event', this.forms.get('localisation_event')?.value);
        formData.append('price', this.forms.get('price')?.value);
        formData.append('illusration_event', this.file);

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
        formData.append('title_event', this.forms.get('title_event')?.value);
        formData.append('description_event', this.forms.get('description_event')?.value);
        formData.append('date_start_event', this.forms.get('date_start_event')?.value);
        formData.append('date_end_event', this.forms.get('date_end_event')?.value);
        formData.append('status_enter_event', this.forms.get('status_enter_event')?.value);
        formData.append('address_event', this.forms.get('address_event')?.value);
        formData.append('localisation_event', this.forms.get('localisation_event')?.value);
        formData.append('price', this.forms.get('price')?.value);
        formData.append('illusration_event', this.file);
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
                let data = this.localStorage.getItem('ag__fs__data');
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
                        title_event: this.forms.value.title_event,
                        price: this.forms.value.price,
                        description_event: this.forms.value.description_event,
                        date_start_event: this.forms.value.date_start_event,
                        date_end_event: this.forms.value.date_end_event,
                        status_enter_event: this.forms.value.status_enter_event,
                        address_event: this.forms.value.address_event,
                        localisation_event: this.forms.value.localisation_event,
                        illusration_event: this.forms.value.illusration_event,
                    }
                    localStorage.setItem('ag__fs__data', JSON.stringify(data));
                    // }
                })
        }
    }
    //
    getToLs(data: any) {
        if (isPlatformBrowser(this._plateFromeID)) {
            if (this.localStorage) {
                this.forms.setValue({
                    title_event: data.title_event,
                    price: this.forms.value.price,
                    description_event: data.description_event,
                    date_start_event: data.date_start_event,
                    date_end_event: data.date_end_event,
                    status_enter_event: data.status_enter_event,
                    address_event: data.address_event,
                    localisation_event: data.localisation_event,
                    illusration_event: data.illusration_event,
                }
                );
            }
        }
    }
    //
    removeToLs() {
        if (isPlatformBrowser(this._plateFromeID)) {
            if (this.localStorage) {
                this.localStorage.removeItem('ag__fs__data');
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

