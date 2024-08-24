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
import {
  EventService,
} from '../../../../services/request/admin/event/event.service';
import {
  TypeEventsService,
} from '../../../../services/request/type-events/type-events.service';
import {
  LsSecureService,
} from '../../../../services/secure/ls-secure/ls-secure.service';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
    selector: 'app-cu-event',
    standalone: true,
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NgxEditorModule
    ],
    templateUrl: './cu-event.component.html',
    styleUrl: './cu-event.component.css'
})
export class CuEventComponent implements OnInit, OnDestroy {

// __------__ 🍀🍀🍀🍀🍀__---   🍀 START VARIABLE 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

// 🍀__---  Global 🍀
    private unscribe = new Subscription();
    public form_type: any = '';

// 🍀__---  Forms 🍀
    public forms: FormGroup = new FormGroup<{
        type_event: FormControl<number | any>,
        event_description: FormControl<string | any>,
        event_title: FormControl<string | any>,
        event_img: FormControl<any[] | null>
    }>
    (
        {
            type_event: new FormControl('', [
                Validators.required
            ]),
            event_description: new FormControl('', [
                Validators.required,
            ]),
            event_title: new FormControl('', [
                Validators.required,
                Validators.maxLength(350)
            ]),
            event_img: new FormControl([], [
                Validators.required
            ])
        }
    );
    public is_upload_file: string | ArrayBuffer | null = '';
    editor!: Editor;
    html = '';
    config = {
        locals: {
            // menu
            bold: 'Bold',
            italic: 'Italic',
            code: 'Code',
            underline: 'Underline',
            strike: 'Strike',
            blockquote: 'Blockquote',
            bullet_list: 'Bullet List',
            ordered_list: 'Ordered List',
            heading: 'Heading',
            h1: 'Header 1',
            h2: 'Header 2',
            h3: 'Header 3',
            h4: 'Header 4',
            h5: 'Header 5',
            h6: 'Header 6',
            align_left: 'Left Align',
            align_center: 'Center Align',
            align_right: 'Right Align',
            align_justify: 'Justify',
            text_color: 'Text Color',
            background_color: 'Background Color',
            horizontal_rule: 'Horizontal rule',
            format_clear: 'Clear Formatting',
            insertLink: 'Insert Link',
            removeLink: 'Remove Link',
            insertImage: 'Insert Image',
            indent: 'Increase Indent',
            outdent: 'Decrease Indent',
            superscript: 'Superscript',
            subscript: 'Subscript',
            undo: 'Undo',
            redo: 'Redo',

            // pupups, forms, others...
            url: 'URL',
            text: 'Text',
            openInNewTab: 'Open in new tab',
            insert: 'Insert',
            altText: 'Alt Text',
            title: 'Title',
            remove: 'Remove',
            enterValidUrl: 'Please enter a valid URL',
        },
    };
    toolbar: Toolbar = [
        // default value
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        // or, set options for link:
        //[{ link: { showOpenInNewTab: false } }, 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
        ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
        ['superscript', 'subscript'],
        ['undo', 'redo'],
    ];
    colorPresets = ['red', '#FF0000', 'rgb(255, 0, 0)'];
// 🍀__---  Api Get var 🍀
    public itemId!: number;
    public item_type_event_id!: number;
    public item_event_img: any;
    public list_type_event: any[] = [];
    public author: any;
    public files!: File;
    public isFiles: any = 'border: 2px dotted gray;';
    protected localStorage!: Storage | undefined;
    private destroy$ = new Subject<void>();
    imageUrl: string | ArrayBuffer | null = null;
    public is_upload: boolean = false;
    public is_step: number = 1;
    selectedFiles: File[] = [];
    imgUploadList: any[] = [];


// __------__ 🍀🍀🍀🍀🍀__---  🍀 END 🍀   ---__ 🍀🍀🍀🍀🍀__------__//
    constructor(
        private _message: ToastService,
        private _request: EventService,
        private _request_type_event: TypeEventsService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject(PLATFORM_ID) public _plateFormId: Object,
        @Inject(DOCUMENT) public _document: Document,
        private _dialogRef: MatDialogRef<CuEventComponent>,
        private _data: LsSecureService,
        private _loading: NgxUiLoaderService
    ){}

    ngOnInit(): void {
        this.author = this._data.getDataToStorage().id;
        this.editor = new Editor({
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
        if (this.data != undefined || null) {
            this.localStorage = this._document.defaultView?.localStorage;
            if (this.data.type == "add") {
                this.form_type = this.data.type;
            } else if (this.data.type == "edit") {
                this.form_type = this.data.type;
                const data = this.data.content;
                this.itemId = data.id;
                this.forms.setValue(
                    {
                        event_description: data.event_description,
                        type_event: data.type_event_id,
                        event_title: data.event_title,
                        event_img: data.event_img,
                    }
                );
                this.html = data.event_description;
                this.item_type_event_id = data.type_event_id;
                this.imgUploadList = JSON.parse(data.event_img);
                this.itemId = data.id;

            }
            this.getListTypeEvent();
        }
    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//
    // ---get event__ 🍀🍀
    getListTypeEvent() {
        // list_event
        this.unscribe.add(
            this._request_type_event.get().subscribe(
                {
                    next: (resp: any) => {
                        if (resp) {
                            this.list_type_event = resp;
                            if(this.data.type == "add"){
                                this.stepIs(1);
                            }
                        }
                    },
                    error: (err: any) => {
                        if (err) {
                            this._message.showError(err);
                        }
                    },
                }
            ));
    }
    // ---add__ 🍀🍀
    addNewItem() {
        const formData = new FormData;
        formData.append('type_event_id', this.forms.value.type_event);
        formData.append('description', this.html);
        formData.append('title', this.forms.value.event_title);
        for(let i = 0; i < this.selectedFiles.length; i++){
            const name = "event_img_"+i;
            formData.append(name, this.selectedFiles[i], this.selectedFiles[i].name);
        }
        formData.append('author_id', this.author);

        this.unscribe.add(
            this._request.add(formData).subscribe(
                {
                    next: (resp: any) => {
                        if (resp.code == 100) {
                            this._loading.stop();
                            this._message.showSuccess(resp);
                            this.removeToLs();
                            setTimeout(()=>{
                                this.close();
                            }, 1000);
                        }
                    },
                    error: (err: any) => {
                        if (err) {
                            this._message.showError(err);
                        }
                    },
                }
            )
        )
    }
    // ---edit__ 🍀🍀
    editCurrentItem() {
        const formData = new FormData;
        formData.append('type_event_id', this.forms.value.type_event);
        formData.append('description', this.html);
        formData.append('title', this.forms.value.event_title);
        if(this.selectedFiles.length > 0){
            for(let i = 0; i < this.selectedFiles.length; i++){
                const name = "event_img_"+i;
                formData.append(name, this.selectedFiles[i], this.selectedFiles[i].name);
            }
        }else{
            formData.append('old_files', this.forms.value.event_img);
        }
        formData.append('author_id', this.author);

        this.unscribe.add(
            this._request.update(formData, this.data.content.slug).subscribe(
                {
                    next: (resp: any) => {
                        if (resp.code == 200) {
                            this._loading.stop();
                            this._message.showSuccess(resp);
                            this.removeToLs();
                            setTimeout(()=>{
                                this.close();
                            }, 1000);
                        }
                    },
                    error: (err: any) => {
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
    //
    stepIs(step: number){
        if(step){
            if(this.localStorage){
                let data = this.localStorage.getItem('ev__fs__data');
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
            interval(1000)
            .pipe(takeUntil(this.destroy$))
            .subscribe(_=>{
                // if(e){
                    const data: any = {
                        event_description: this.forms.value.event_description,
                        type_event: this.forms.value.type_event,
                        event_title: this.forms.value.event_title,
                    }
                    localStorage.setItem('ev__fs__data', JSON.stringify(data));
                // }
            })
        }
    }
    //
    getToLs(data: any){
        if(isPlatformBrowser(this._plateFormId)){
            if(this.localStorage){
                this.forms.setValue({
                        event_description: data.event_description,
                        type_event: data.type_event,
                        event_title: data.event_title,
                        event_img: null
                    }
                );
            }
        }
    }
    //
    removeToLs(){
        if(isPlatformBrowser(this._plateFormId)){
            if(this.localStorage){
                this.localStorage.removeItem('ev__fs__data');
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
            let status: number = 0;
            this.selectedFiles = [];
            this.imgUploadList = [];
            const files: FileList = e.target.files;
            for (let i = 0; i < files.length; i++){
                const file: File = files[i];
                if (file.type.match('image.*')) {
                    this.selectedFiles.push(file);
                    status += 1;
                } else {
                    status = status;
                    e.target.value = '';
                    this._message.showError({status: "Attention", message: "Veuillez sélectionner uniquement des images."});
                }
            }
            if(status == this.selectedFiles.length){
                this.checkFilesSizes(e);
            }
        }
    }
    // files sizes
    checkFilesSizes(e: any){
        const maxSize = 1048576; // 1Mo en octets
        let imgUploadListLength = 0;
        for (let i = 0; i < this.selectedFiles.length; i++) {
            if (this.selectedFiles[i].size > maxSize) {
                this._message.showWarning({status: "Attention", message: "Veuillez sélectionner uniquement des images dont la taille maximale est de 1Mo."});
                e.target.value = '';
            } else {
                imgUploadListLength += 1;
                this.files = this.selectedFiles[i];
                if (this.selectedFiles[i]) {
                    const reader = new FileReader();
                    reader.onload = (e: any) => {
                        // this.selectedFiles.push(file);
                        this.imgUploadList.push({src: e.target.result});
                    };
                    reader.readAsDataURL(this.selectedFiles[i]);
                }
            }
        }

        if(imgUploadListLength == this.selectedFiles.length){
            this.forms.setValue({
                event_description: this.forms.value.event_description,
                type_event: this.forms.value.type_event,
                event_title: this.forms.value.event_title,
                event_img: JSON.stringify(this.selectedFiles)
            });
        }else{
            e.target.value = '';
            this.selectedFiles = [];
            this.forms.setValue({
                event_description: this.forms.value.event_description,
                type_event: this.forms.value.type_event,
                event_title: this.forms.value.event_title,
                event_img: null
            });
        }
    }
// __------__ 🍀🍀🍀🍀🍀__---   🍀 END EVENT 🍀   ---__ 🍀🍀🍀🍀🍀__------__//


    ngOnDestroy(): void {
        this.editor.destroy();
        this.unscribe.unsubscribe();
        this.destroy$.next();
        this.destroy$.complete();
    }
}

