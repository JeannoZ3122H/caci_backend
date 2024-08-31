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
  InfoPratiqueService,
} from '../../../../services/request/info-pratique/info-pratique.service';
import {
  LsSecureService,
} from '../../../../services/secure/ls-secure/ls-secure.service';
import { ToastService } from '../../../../services/toast/toast.service';
import {
  DocumentJoinsComponent,
} from '../../document-joins/document-joins.component';

@Component({
    selector: 'app-cu-info-pratique',
    standalone: true,
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NgxEditorModule,
    ],
    templateUrl: './cu-info-pratique.component.html',
    styleUrl: './cu-info-pratique.component.css'
})
export class CuInfoPratiqueComponent implements OnInit, OnDestroy {
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
    // 2

    // 3
    public forms3: FormGroup = new FormGroup<{
        libelle: FormControl<string | null>,
        description: FormControl<string | null>,
        illustration: FormControl<File | null>,
    }>({
        libelle: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        illustration: new FormControl(null),
    });

    // 4
    public forms4: FormGroup = new FormGroup<{
        ask: FormControl<string | null>,
        answere: FormControl<string | null>,
        keyword: FormControl<string | null>,
        category_ask: FormControl<string | null>,
    }>({
        ask: new FormControl(null, [Validators.required]),
        answere: new FormControl(null, [Validators.required]),
        keyword: new FormControl(null, [Validators.required]),
        category_ask: new FormControl('null', [Validators.required]),
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
    public list_type_contents: any[] = [
        {
            id: 1,
            type_content: "Standard",
            type_ref: "STYLE-01"
        },
        {
            id: 2,
            type_content: "document",
            type_ref: "STYLE-02"
        },
        {
            id: 3,
            type_content: "Section",
            type_ref: "STYLE-03"
        },
    ];
    public list_nbre: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    public current_content: string = '';
    public item_data: any = {};
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
        private _request: InfoPratiqueService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject(DOCUMENT) private _document: Document,
        @Inject(PLATFORM_ID) private _plateFromeID: Document,
        private _dialogRef: MatDialogRef<CuInfoPratiqueComponent>,
        private _loading: NgxUiLoaderService,
        private _ls: LsSecureService,
        private _dialog: MatDialog,
        private _auth: AuthService
    ){}

    ngOnInit(): void {
        this.editor = new Editor();
        if (this.data != undefined || null) {
            this.localStorage = this._document.defaultView?.localStorage;
            this.type_content = this.data.element;
            this.title_content = this.data.title;
            if (this.data.type == "add") {
                this.form_type = this.data.type;
                this.stepIs(1);
            } else if (this.data.type == "edit") {
                this.form_type = this.data.type;
                this.item_data = this.data.content;
                const data = this.data.content;
                if(this.type_content == "faq"){
                    this.forms4.setValue(
                        {
                            ask: data.ask,
                            answere: data.answere,
                            keyword: data.keyword,
                            category_ask: data.category_ask,
                        }
                    );
                }
                if(this.type_content == "devenir"){
                    this.forms3.setValue({
                        libelle: data.libelle,
                        subTitle: data.subTitle,
                        description: data.description,
                        illustration: null
                    });
                }
                if(this.type_content == "soumettre-doc"){
                    this.forms1.setValue({
                        libelle: data.libelle,
                        subTitle: data.subTitle,
                        description: data.description,
                        illustration: null
                    });
                }
                if(data.illustration && data.illustration != "file_not_found"){
                    this.imageUrl = data.illustration;
                }else{
                    this.imageUrl = '';
                }
                this.files = `height: 250px;
                    border: 2px dotted gray;
                    background: linear-gradient(190deg, rgba(4,19,61,0.5844931722689075) 12%, rgba(4,19,61,0.248358718487395) 64%), url('${this.imageUrl}')no-repeat center center;
                    background-size: 80%`;
                this.docsFiles = `height: 250px;
                    border: 2px dotted gray;
                    background: linear-gradient(190deg, rgba(4,19,61,0.5844931722689075) 12%, rgba(4,19,61,0.248358718487395) 64%), url('${this.imageUrl}')no-repeat center center;
                    background-size: 80%`;
                this.itemId = data.id;
            }
        }
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    onSubmitForms1(type: any){
        const formData = new FormData();
        if(type == "add"){
            formData.append('author_id', this._ls.getDataToStorage().id);
            formData.append('libelle', this.forms1.get('libelle')?.value);
            formData.append('subTitle', this.forms1.get('subTitle')?.value);
            formData.append('description', this.forms1.get('description')?.value);
            formData.append('illustration', this.file?this.file:'');
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
                            if(err.status == 401){
                                this._auth.autoLogOut();
                            }
                        },
                    }
                )
            );
        }
        if(type == "edit"){
            formData.append('author_id', this._ls.getDataToStorage().id);
            formData.append('libelle', this.forms1.get('libelle')?.value);
            formData.append('subTitle', this.forms1.get('subTitle')?.value);
            formData.append('description', this.forms1.get('description')?.value);
            formData.append('illustration', this.file?this.file:'');
            this._loading.start();
            this.subscription.add(
                this._request.update(formData, this.item_data.slug).subscribe(
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
                            if(err.status == 401){
                                this._auth.autoLogOut();
                            }
                        },
                    }
                )
            );
        }
    }

    onSubmitForms3(type: any){
        const formData = new FormData();
        if(type == "add"){
            formData.append('author_id', this._ls.getDataToStorage().id);
            formData.append('libelle', this.forms3.get('libelle')?.value);
            formData.append('subTitle', this.forms1.get('subTitle')?.value);
            formData.append('description', this.forms3.get('description')?.value);
            formData.append('illustration', this.file?this.file:'');
            this._loading.start();
            this.subscription.add(
                this._request.addDevenir(formData).subscribe(
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
                            if(err.status == 401){
                                this._auth.autoLogOut();
                            }
                        },
                    }
                )
            );
        }
        if(type == "edit"){
            formData.append('author_id', this._ls.getDataToStorage().id);
            formData.append('libelle', this.forms3.get('libelle')?.value);
            formData.append('subTitle', this.forms1.get('subTitle')?.value);
            formData.append('description', this.forms3.get('description')?.value);
            formData.append('illustration', this.file?this.file:'');
            this._loading.start();
            this.subscription.add(
                this._request.updateDevenir(formData, this.item_data.slug).subscribe(
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
                            if(err.status == 401){
                                this._auth.autoLogOut();
                            }
                        },
                    }
                )
            );
        }
    }
    //
    editFaq(){
        const formData = new FormData();
        formData.append('author_id', this._ls.getDataToStorage().id);
        formData.append('ask', this.forms4.get('ask')?.value);
        formData.append('answere', this.forms4.get('answere')?.value);
        formData.append('keyword', this.forms4.get('keyword')?.value);
        formData.append('category_ask', this.forms4.get('category_ask')?.value);

        this._loading.start();
        this.subscription.add(
            this._request.updateFaq(formData, this.data.content.slug).subscribe(
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
                        if(err.status == 401){
                            this._auth.autoLogOut();
                        }
                    },
                }
            )
        )
    }
// __------__ 🍀🍀🍀🍀🍀__---   🍀 END REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START EVENT 🍀   ---__ 🍀🍀🍀🍀🍀__------__//
    // get all file user is send
    getFileNumber(e: any){
        if(e){
            this.file_nbre = e.value;
        }
    }
    //
    onChangeTypeContent(e: any){
        if(e){
            const value = e.value;
            console.log('val', value)
            this.current_content = value;
        }
    }
    //
    stepIs(step: number) {
        if (step) {
            if (this.localStorage) {
                let data = this.localStorage.getItem('info__fs__data');
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
                    if(this.type_content == "devenir"){
                        const data: any = {
                            libelle: this.forms3.value.libelle,
                            description: this.forms3.value.description,
                            illustration: null
                        }
                        localStorage.setItem('info__fs__data', JSON.stringify(data));
                    }
                    if(this.type_content == "soumettre-doc"){
                        // if(e){
                        const data: any = {
                            libelle: this.forms1.value.libelle,
                            description: this.forms1.value.description,
                            illustration: null
                        }
                        localStorage.setItem('info__fs__data', JSON.stringify(data));
                        // }
                    }
                })
        }
    }
    //
    getToLs(data: any) {
        if (isPlatformBrowser(this._plateFromeID)) {
            if (this.localStorage) {
                if(this.type_content == "devenir"){
                    this.forms3.setValue({
                        libelle: data.libelle,
                        description: data.description,
                        illustration: null
                    });
                }
                if(this.type_content == "soumettre-doc"){
                    this.forms1.setValue({
                        libelle: data.libelle,
                        description: data.description,
                        illustration: null
                    });
                }
            }
        }
    }
    //
    removeToLs() {
        if (isPlatformBrowser(this._plateFromeID)) {
            if (this.localStorage) {
                this.localStorage.removeItem('info__fs__data');
            }
        }
    }
    //
    onDocsFileChange(event: any) {
        const file = event.target.files[0];
        this.file = file;
        if (file) {
            this.is_upload = true;
            const reader = new FileReader();

            // Lire le fichier en tant qu'URL de données (pour les images)
            reader.onload = (e: any) => {
                this.docsFileUrl = e.target.result;
                this.docsFiles = `height: 250px;
                    border: 2px dotted gray;
                    background: linear-gradient(190deg, rgba(4,19,61,0.5844931722689075) 12%, rgba(4,19,61,0.248358718487395) 64%), url('${this.docsFileUrl}')no-repeat center center;
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
    openJoinDocument(data: any, type: string){
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
