import {
  CommonModule,
  DOCUMENT,
  isPlatformBrowser,
} from '@angular/common';
import {
  AfterViewInit,
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

import {
  Editor,
  NgxEditorModule,
  schema,
  Toolbar,
} from 'ngx-editor';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  Plugin,
  PluginKey,
} from 'prosemirror-state';
import {
  interval,
  Observable,
  Subject,
  Subscription,
  takeUntil,
} from 'rxjs';

import { imageValidator } from '../../../../file-pattern';
import { MaterialModule } from '../../../../material-module';
import {
  OrganisationService,
} from '../../../../services/request/about/organisation/organisation.service';
import {
  LsSecureService,
} from '../../../../services/secure/ls-secure/ls-secure.service';
import { ToastService } from '../../../../services/toast/toast.service';

const plugin = new Plugin({
      key: new PluginKey('plugin'),
  });

@Component({
    selector: 'app-cu-organisation',
    standalone: true,
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NgxEditorModule
    ],
    templateUrl: './cu-organisation.component.html',
    styleUrl: './cu-organisation.component.css'
})
export class CuOrganisationComponent implements OnInit, OnDestroy, AfterViewInit {

    private unscribe = new Subscription();
    public form_type: any = '';

    public itemId!: number;

    public item_type_event_id!: number;
    public item_files: any;

    forms = new FormGroup<{
        title: FormControl<string | any>,
        sub_title: FormControl<string | any>,
        description: FormControl<string | any>,
        files: FormControl<File | any | Object>
    }>
    ({
        title: new FormControl(''),
        sub_title: new FormControl(''),
        description: new FormControl('Entrer la description ici...', [
            Validators.required,
        ]),
        files: new FormControl(null, [
            imageValidator()
        ])
    });
    editor: Editor =  new Editor({
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
    html!: '';

    public is_upload_file: string | ArrayBuffer | null = '';
    public is_upload: boolean = false;
    public is_step: number = 1;

    // VARCHAR
    public is_loading_img: boolean = false;
    public is_status_img: string = '';
    protected localStorage!: Storage | undefined;
    private destroy$ = new Subject<void>();

    constructor(
        private _message: ToastService,
        private _request: OrganisationService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject(PLATFORM_ID) public _plateFormId: Object,
        @Inject(DOCUMENT) public _document: Document,
        private _dialogRef: MatDialogRef<CuOrganisationComponent>,
        private _ls: LsSecureService,
        private _loading: NgxUiLoaderService
    ){}

    ngOnInit(): void {
        this.editor = new Editor();
        if (this.data != undefined || null) {
            this.localStorage = this._document.defaultView?.localStorage;
            this.editor.registerPlugin(plugin);
            if (this.data != undefined || null) {
                if (this.data.type == "add") {
                    this.form_type = this.data.type;
                    this.stepIs(1);
                } else if (this.data.type == "edit") {
                    this.form_type = this.data.type;
                    const data = this.data.content;
                    this.itemId = data.id;
                    this.forms.setValue(
                        {
                            title: data.title?data.title:null,
                            sub_title: data.sub_title?data.sub_title:null,
                            files: null,
                            description: data.description?data.description:null
                        }
                    )

                    this.is_upload_file = data.illustration;
                }
                // this.getListTypeEvent();
            }
        }
    }
    // __ ON AFTER VIEW 🍀 //
    ngAfterViewInit(): void {

    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//
    // __ ADD __ 🍀🍀
    addNewItem() {
        const formData = new FormData;
        formData.append('title', this.forms.value.title);
        formData.append('sub_title', this.forms.value.sub_title);
        formData.append('description', this.forms.value.description);
        formData.append('author_id', this._ls.getDataToStorage().id);
        formData.append('illustration', this.item_files);

        this._loading.start();
        this.unscribe.add(
            this._request.add(formData).subscribe(
                {
                    next: (resp: any) => {
                        this._loading.stop();
                        if(resp.code == 100){
                            this._message.showSuccess(resp);
                            this.removeToLs();
                            setTimeout(() => {
                                this._dialogRef.close(true);
                            }, 2000);
                        }
                    },
                    error: (err: any) => {
                        this._loading.stop();
                        if (err) {
                            this._message.showError(err);
                        }
                    },
                }
            )
        )
    }
    // __ EDIT __ 🍀🍀
    editCurrentItem() {

        const formData = new FormData;
        formData.append('title', this.forms.value.title?this.forms.value.title:'');
        formData.append('sub_title', this.forms.value.sub_title?this.forms.value.sub_title:'');
        formData.append('description', this.forms.value.description?this.forms.value.description:'');
        formData.append('author_id', this._ls.getDataToStorage().id);
        formData.append('illustration', this.item_files);

        this._loading.start();
        this.unscribe.add(
            this._request.update(formData, this.data.content.slug).subscribe(
                {
                    next: (resp: any) => {
                        this._loading.stop();
                        if(resp.code == 200){
                            this._message.showSuccess(resp);
                            this.removeToLs();
                            setTimeout(() => {
                                this._dialogRef.close(true);
                            }, 2000);
                        }
                    },
                    error: (err: any) => {
                        this._loading.stop();
                        if (err) {
                            this._message.showError(err);
                        }
                    },
                }
            )
        )
    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 END REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START EVENT 🍀   ---__ 🍀🍀🍀🍀🍀__------__//
    // __ READ FILE AS DATA URL 🍀 //
    readFileAsDataURL(file: File): Observable<string | ArrayBuffer | null> {
        return new Observable(observer => {
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                if (event.target?.result) {
                    observer.next(event.target.result as string);
                    observer.complete();
                } else {
                    observer.error('Erreur lors de la lecture du fichier');
                }
            };
            reader.onerror = () => {
                observer.error('Erreur lors de la lecture du fichier');
            };
            reader.readAsDataURL(file);
        });
    }
    // __ UPLOAD FILE 🍀 //
    //
    stepIs(step: number){
        if(step){
            if(this.localStorage){
                let data = this.localStorage.getItem('org__fs__data');
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
        if(isPlatformBrowser(this._plateFormId)){
            interval(5000)
            .pipe(takeUntil(this.destroy$))
            .subscribe(_=>{
                // if(e){
                    const data: any = {
                        title: this.forms.value.title,
                        sub_title: this.forms.value.sub_title,
                        description: this.forms.value.description,
                    }
                    localStorage.setItem('org__fs__data', JSON.stringify(data));
                // }
            })
        }
    }
    //
    getToLs(data: any){
        if(isPlatformBrowser(this._plateFormId)){
            if(this.localStorage){
                this.forms.setValue({
                        title: data.title,
                        sub_title: data.sub_title,
                        description: data.description,
                        files: null
                    }
                );
            }
        }
    }
    //
    removeToLs(){
        if(isPlatformBrowser(this._plateFormId)){
            if(this.localStorage){
                this.localStorage.removeItem('org__fs__data');
            }
        }
    }
    // close
    close(){
        this._dialogRef.close(true)
    }
    // upload
    uploadFile(e: any) {
        if (isPlatformBrowser(this._plateFormId)) {
            const file = e.target.files[0];
            if (file.type.match('image.*')) {
                const maxSize = 1048576; // 1Mo en octets
                if (file.size > maxSize) {
                    this._message.showWarning({
                        status: "Attention",
                        message: "Veuillez sélectionner uniquement une image dont la taille maximale est de 1Mo."
                    });
                    e.target.value = '';
                } else {
                    this.readFileAsDataURL(file).subscribe({
                        next: (dataURL) => {
                            this.is_upload_file = dataURL;
                        }, error: (err) => {
                            console.error(err);
                        }
                    });
                    this.item_files = file;
                    this.forms.setValue({
                        title: this.forms.value.title,
                        sub_title: this.forms.value.sub_title,
                        description: this.forms.value.description,
                        files: null
                    });
                }
            } else {
                e.target.value = '';
                this._message.showError({status: "Attention", message: "Veuillez sélectionner uniquement qu'un fichier image."});
            }
        }
    }
// __------__ 🍀🍀🍀🍀🍀__---   🍀 END EVENT 🍀   ---__ 🍀🍀🍀🍀🍀__------__//


   // __ ON DESTROY 🍀 //
    ngOnDestroy(): void {
        this.unscribe.unsubscribe();
        this.editor.destroy();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
