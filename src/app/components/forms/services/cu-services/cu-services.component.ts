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
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

import {
  Editor,
  NgxEditorModule,
  schema,
  Toolbar,
} from 'ngx-editor';
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
  ServicesService,
} from '../../../../services/request/services/services.service';
import {
  LsSecureService,
} from '../../../../services/secure/ls-secure/ls-secure.service';
import { ToastService } from '../../../../services/toast/toast.service';
import {
  DocumentJoinsComponent,
} from '../../document-joins/document-joins.component';
import {
  CuInfoPratiqueComponent,
} from '../../info-pratique/cu-info-pratique/cu-info-pratique.component';

@Component({
    selector: 'app-cu-services',
    standalone: true,
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NgxEditorModule,
    ],
    templateUrl: './cu-services.component.html',
    styleUrl: './cu-services.component.css'
})
export class CuServicesComponent implements OnInit, OnDestroy {
    // Subscription
    private subscription = new Subscription();
    // Show Content
    public form_type: any = '';
    public type_content: any = '';
    public title_content: any = '';

    // Forms Variables
    // 1
    public userLoging: any = {};
    public itemId!: number;
    public is_upload: boolean = false;
    public is_step: number = 1;
    public forms1: FormGroup = new FormGroup<{
        libelle: FormControl<string | null>,
        subTitle: FormControl<string | null>,
        description: FormControl<string | null>,
        illustration: FormControl<File | null>,
    }>({
        libelle: new FormControl('', [Validators.required]),
        subTitle: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        illustration: new FormControl(null),
    });

    // LocalStorage
    protected localStorage!: Storage | undefined;

    // Global Variable
    imageUrl: string | ArrayBuffer | null = null;
    public file!: File;
    docsFileUrl: string | ArrayBuffer | null = null;
    public docsFile!: File;
    files: any = 'border: 2px dotted gray;';
    docsFiles: any = 'border: 2px dotted gray;';
    public list_nbre: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    public current_content: string = '';
    public type_service_data: any = {};
    public service_data: any = {};
    public file_nbre: number = 0;

    // Editor Text
    private destroy$ = new Subject<void>();
    editor: Editor = new Editor({
        content: '',
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
        plugins: [], //https://prosemirror.net/docs/guide/#state
        schema, //https://prosemirror.net/examples/schema/
        nodeViews: {}, //https://prosemirror.net/docs/guide/#state,
        attributes: {}, // https://prosemirror.net/docs/ref/#view.EditorProps.attributes
        linkValidationPattern: '',
        parseOptions: {}, // https://prosemirror.net/docs/ref/#model.ParseOptions
    });
    toolbar: Toolbar = [
        // default value
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        //[{ link: { showOpenInNewTab: false } }, 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
        ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
        ['superscript', 'subscript'],
        ['undo', 'redo'],
    ];
    colorPresets = ['red', '#FF0000', 'rgb(255, 0, 0)'];

    constructor(
        private _message: ToastService,
        private _request: ServicesService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject(DOCUMENT) private _document: Document,
        @Inject(PLATFORM_ID) private _plateFromeID: Document,
        private _dialogRef: MatDialogRef<CuInfoPratiqueComponent>,
        private _loading: NgxUiLoaderService,
        private _ls: LsSecureService,
        private _dialog: MatDialog,
        private _auth: AuthService
    ) { }

    ngOnInit(): void {
        this.editor = new Editor();
        if (this.data != undefined || null) {

            console.log('data', this.data)
            this.localStorage = this._document.defaultView?.localStorage;
            this.type_service_data = this.data.type_service_data;
            if (this.data.type == "add") {
                this.form_type = this.data.type;
                this.stepIs(1);
            } else if (this.data.type == "edit") {
                this.form_type = this.data.type;
                this.service_data = this.data.content;
                const data = this.data.content;
                this.forms1.setValue({
                    libelle: data.libelle,
                    subTitle: data.subTitle,
                    description: data.description,
                    illustration: null
                });
                if (data.illustration && data.illustration != "file_not_found") {
                    this.imageUrl = data.illustration;
                } else {
                    this.imageUrl = '';
                }
                this.files = `height: 250px;
                    border: 2px dotted gray;
                    background: linear-gradient(190deg, rgba(4,19,61,0.5844931722689075) 12%, rgba(4,19,61,0.248358718487395) 64%), url('${this.imageUrl}')no-repeat center center;
                    background-size: 80%`;
                this.itemId = data.id;
            }
        }
    }


    // __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    onSubmitForms1(type: any) {
        const formData = new FormData();
        if (type == "add") {
            formData.append('author_id', this._ls.getDataToStorage().id);
            formData.append('libelle', this.forms1.get('libelle')?.value);
            formData.append('subTitle', this.forms1.get('subTitle')?.value);
            formData.append('description', this.forms1.get('description')?.value);
            formData.append('type_service_id', this.type_service_data.id);
            formData.append('illustration', this.file ? this.file : '');
            this._loading.start();
            this.subscription.add(
                this._request.add(formData).subscribe(
                    {
                        next: (resp: any) => {
                            if (resp) {
                                if (resp.code == 100) {
                                    this._loading.stop();
                                    this._message.showSuccess(resp);
                                    setTimeout(() => {
                                        this.removeToLs();
                                        this.close();
                                        this.openJoinDocument(resp.data, 'init');
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
                            if (err.status == 401) {
                                this._auth.autoLogOut();
                            }
                        },
                    }
                )
            );
        }
        if (type == "edit") {
            formData.append('author_id', this._ls.getDataToStorage().id);
            formData.append('libelle', this.forms1.get('libelle')?.value);
            formData.append('subTitle', this.forms1.get('subTitle')?.value);
            formData.append('description', this.forms1.get('description')?.value);
            formData.append('type_service_id', this.type_service_data.id);
            formData.append('illustration', this.file ? this.file : '');
            this._loading.start();
            this.subscription.add(
                this._request.update(formData, this.service_data.slug).subscribe(
                    {
                        next: (resp: any) => {
                            if (resp) {
                                if (resp.code == 200) {
                                    this._loading.stop();
                                    this._message.showSuccess(resp);
                                    this.removeToLs();
                                    setTimeout(() => {
                                        this.close();
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
                            if (err.status == 401) {
                                this._auth.autoLogOut();
                            }
                        },
                    }
                )
            );
        }
    }
// __------__ 🍀🍀🍀🍀🍀__---   🍀 END REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START EVENT 🍀   ---__ 🍀🍀🍀🍀🍀__------__//
    // get all file user is send
    getFileNumber(e: any) {
        if (e) {
            this.file_nbre = e.value;
        }
    }
    //
    onChangeTypeContent(e: any) {
        if (e) {
            const value = e.value;
            this.current_content = value;
        }
    }
    //
    stepIs(step: number) {
        if (step) {
            if (this.localStorage) {
                let data = this.localStorage.getItem('serv__fs__data');
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
                    const data: any = {
                        libelle: this.forms1.value.libelle,
                        subTitle: this.forms1.value.subTitle,
                        description: this.forms1.value.description,
                        illustration: null
                    }
                    localStorage.setItem('serv__fs__data', JSON.stringify(data));
                })
        }
    }
    //
    getToLs(data: any) {
        if (isPlatformBrowser(this._plateFromeID)) {
            if (this.localStorage) {
                this.forms1.setValue({
                    libelle: data.libelle,
                    subTitle: data.subTitle,
                    description: data.description,
                    illustration: null
                });
            }
        }
    }
    //
    removeToLs() {
        if (isPlatformBrowser(this._plateFromeID)) {
            if (this.localStorage) {
                this.localStorage.removeItem('serv__fs__data');
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
    //
    fileValidator(control: FormControl): { [key: string]: any } | null {
        const file = control.value;
        if (!file) {
            return null; // If no file is selected, return null
        }
        const allowedMimeTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'image/jpeg', 'image/png'];
        const fileType = file.type;
        return allowedMimeTypes.includes(fileType) ? null : { invalidFileType: true };
    }
    //
    openJoinDocument(data: any, type: string) {
        this._dialog.open(DocumentJoinsComponent,
            {
                width: '80%',
                enterAnimationDuration: '300ms',
                exitAnimationDuration: '200ms',
                data: {
                    type: type,
                    content: data,
                    element: this.type_content,
                    title: this.title_content
                }
            }
        );
    }
// __------__ 🍀🍀🍀🍀🍀__---   🍀 END EVENT 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.destroy$.next();
        this.destroy$.complete();
        // this.removeToLs();
    }
}
