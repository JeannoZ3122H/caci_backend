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
  ViewChild,
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import {
  DomSanitizer,
  SafeResourceUrl,
} from '@angular/platform-browser';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  interval,
  Subject,
  Subscription,
  takeUntil,
} from 'rxjs';

import { MaterialModule } from '../../../../material-module';
import { AuthService } from '../../../../services/auth/auth.service';
import {
  FormControlService,
} from '../../../../services/form-control/form-control.service';
import {
  RessourcesService,
} from '../../../../services/request/ressources/ressources.service';
import {
  LsSecureService,
} from '../../../../services/secure/ls-secure/ls-secure.service';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
    selector: 'app-cu-publications',
    standalone: true,
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
    ],
    templateUrl: './cu-publications.component.html',
    styleUrl: './cu-publications.component.css'
})
export class CuPublicationsComponent implements OnInit, OnDestroy {
    @ViewChild('tabGroupContent') public tabGroupContent!: MatTabGroup

    private unscribe = new Subscription();
    public form_type: any = '';

    public userLoging: any = {};
    public itemId!: number;
    public is_upload: boolean = false;
    public is_step: number = 1;

    forms = new FormGroup<{
        type_publication_id: FormControl<string | any>,
        libelle: FormControl<string | any>,
        url: FormControl<string | any>,
        type_file: FormControl<boolean | any>,
        url_file: FormControl<File | any>
    }>({
            type_publication_id: new FormControl('', [
                Validators.required,
                Validators.minLength(1)
            ]),
            libelle: new FormControl(null, [
                Validators.required,
            ]),
            url: new FormControl('https://www.', [
                Validators.required,
            ]),
            url_file: new FormControl(this._filePattern.fileValidator),
            type_file: new FormControl(2, [
                Validators.required
            ]),
    });

    public list_type_publication: any[] = [];
    protected localStorage!: Storage | undefined;
    private destroy$ = new Subject<void>();
    imageUrl: string | ArrayBuffer | null = null;
    public file!: File;
    files: any = 'border: 2px dotted gray;';
    pdfUrl: SafeResourceUrl | any;

    public status_bar: string = '0';

    constructor(
        private _message: ToastService,
        private _request: RessourcesService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject(DOCUMENT) private _document: Document,
        @Inject(PLATFORM_ID) private _plateFromeID: Document,
        private _dialogRef: MatDialogRef<CuPublicationsComponent>,
        private _loading: NgxUiLoaderService,
        private _ls: LsSecureService,
        private _snackBar: MatSnackBar,
        private _filePattern: FormControlService,
        private _domSanitazer: DomSanitizer,
        private _auth: AuthService
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
                        type_publication_id: data.type_publication_id,
                        libelle: data.libelle,
                        url_file: null,
                        url: data.url,
                        type_file: data.type_file == "true"?true:false
                    }
                );
                this.pdfUrl = this._domSanitazer.bypassSecurityTrustResourceUrl(data.url_file + '#toolbar=0');
                this.files = `height: 250px;
                    border: 2px dotted gray;
                    background: linear-gradient(190deg, rgba(4,19,61,0.5844931722689075) 12%, rgba(4,19,61,0.248358718487395) 64%), url('${this.imageUrl}')no-repeat center center;
                    background-size: 80%`;
                this.itemId = data.id;
            }
        }
        this.getListTypePublication();
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---get list type publication__ 🍀🍀
    getListTypePublication(){
        this.unscribe.add(
            this._request.getTypePublication().subscribe(
                {
                    next: (resp: any) => {
                        this.list_type_publication = resp;
                    },
                    error: (err: any) => {
                        this._loading.stop();
                        if(err.status == 401){
                            this._auth.autoLogOut();
                        }
                    }
                }
            )
        )
    }

    // ---add__ 🍀🍀
    addNewItem () {
        const formData = new FormData();
        formData.append('author_id', this._ls.getDataToStorage().id);
        formData.append('type_publication_id', this.forms.get('type_publication_id')?.value);
        formData.append('libelle', this.forms.get('libelle')?.value);
        formData.append('url', this.forms.get('url')?.value);
        formData.append('type_file', this.forms.get('type_file')?.value);
        formData.append('url_file', this.file);
        this._loading.start();
        this.unscribe.add(
            this._request.addPublication(formData).subscribe(
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
                        if(err.status == 401){
                            this._auth.autoLogOut();
                        }
                    },
                }
            )
        );
    }
    // ---edit__ 🍀🍀
    editCurrentItem () {
        const formData = new FormData();
        formData.append('author_id', this._ls.getDataToStorage().id);
        formData.append('type_publication_id', this.forms.get('type_publication_id')?.value);
        formData.append('libelle', this.forms.get('libelle')?.value);
        formData.append('url', this.forms.get('url')?.value);
        formData.append('type_file', this.forms.get('type_file')?.value);
        formData.append('url_file', this.file);
        this._loading.start();
        this.unscribe.add(
            this._request.updatePublication(formData, this.data.content.slug).subscribe(
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
                        if(err.status == 401){
                            this._auth.autoLogOut();
                        }
                    },
                }
            )
        );
    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 END REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START EVENT 🍀   ---__ 🍀🍀🍀🍀🍀__------__//
    //
    goToNextTab() {
        this.forms.setValue({
            type_publication_id: this.forms.value.type_publication_id,
            libelle: "",
            url: null,
            type_file: this.forms.value.type_file,
            url_file: null
        });
        this._snackBar.open("Cliquez sur l'étape 2 (Document) pour charger le/les document(s) !", "Infos");
    }
    //
    stepIs(step: number) {
        if (step) {
            if (this.localStorage) {
                let data = this.localStorage.getItem('pub__fs__data');
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
                        type_publication_id: this.forms.value.type_publication_id,
                        libelle: this.forms.value.libelle,
                        url: this.forms.value.url,
                        type_file: this.forms.value.type_file,
                        url_file: this.forms.value.url_file,
                    };
                    localStorage.setItem('pub__fs__data', JSON.stringify(data));
                    // }
                })
        }
    }
    //
    getToLs(data: any) {
        if (isPlatformBrowser(this._plateFromeID)) {
            if (this.localStorage) {
                this.forms.setValue({
                    type_publication_id: data.type_publication_id,
                    libelle: data.libelle,
                    url: data.url,
                    type_file: data.type_file,
                    url_file: null
                });
            }
        }
    }
    //
    removeToLs() {
        if (isPlatformBrowser(this._plateFromeID)) {
            if (this.localStorage) {
                this.localStorage.removeItem('pub__fs__data');
            }
        }
    }
    //
    onFileChange(event: any) {
        this.status_bar = '40';
        const file = event.target.files[0];
        this.file = file;
        if (file) {
            this.status_bar = '60';
            this.is_upload = true;
            const reader = new FileReader();
            this.status_bar = '80';
            reader.onload = (e: any) => {
                this.status_bar = '100';
                this.pdfUrl = this._domSanitazer.bypassSecurityTrustResourceUrl(e.target.result + '#toolbar=0');
                this.files = `height: 250px;
                    border: 2px dotted gray;
                    background: linear-gradient(190deg, rgba(4,19,61,0.5844931722689075) 12%, rgba(4,19,61,0.248358718487395) 64%), url('${this.imageUrl}')no-repeat center center;
                    background-size: 80%`;
            };
            reader.readAsDataURL(file);
        } else {
            this.status_bar = '0';
            this.is_upload = false;
        }
    }
    // check pattern
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
