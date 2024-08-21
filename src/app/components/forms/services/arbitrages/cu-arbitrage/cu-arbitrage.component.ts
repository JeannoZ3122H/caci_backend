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
import { MatRadioChange } from '@angular/material/radio';

import {
  Editor,
  NgxEditorModule,
  Toolbar,
} from 'ngx-editor';
import {
  Plugin,
  PluginKey,
} from 'prosemirror-state';
import {
  Observable,
  Subscription,
} from 'rxjs';

import { imageValidator } from '../../../../../file-pattern';
import { MaterialModule } from '../../../../../material-module';
import {
  BannersService,
} from '../../../../../services/request/admin/banners/banners.service';
import {
  TypeEventsService,
} from '../../../../../services/request/type-events/type-events.service';
import { ToastService } from '../../../../../services/toast/toast.service';
import {
  CuBannersComponent,
} from '../../../banners/cu-banners/cu-banners.component';

const plugin = new Plugin({
  key: new PluginKey('plugin'),
});


@Component({
    selector: 'app-cu-arbitrage',
    standalone: true,
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NgxEditorModule
    ],
    templateUrl: './cu-arbitrage.component.html',
    styleUrl: './cu-arbitrage.component.css'
})
export class CuArbitrageComponent implements OnInit, OnDestroy, AfterViewInit {

    private unscribe = new Subscription();
    public form_type: any = '';

    public itemId!: number;

    public item_url: any = '';
    public item_description: any = '';
    public item_type_event: any = '';
    public item_type_event_id!: number;
    public item_libelle: any = '';
    public item_files: any;

    adminForms = new FormGroup<{
        description: FormControl<string | any>,
        libelle: FormControl<string | any>,
        files: FormControl<File | any>
    }>
    (
        {
            description: new FormControl('', [
                Validators.required,
                Validators.maxLength(400),
                Validators.pattern('^[a-zA-Z0-9_.-]*$')
            ]),
            libelle: new FormControl(0, [
                Validators.required,
                Validators.maxLength(250),
                Validators.pattern('^[a-zA-Z0-9_.-]*$')
            ]),
            files: new FormControl('', [
                Validators.required,
                imageValidator()
            ])
        }
    );
    editor: Editor =  new Editor(
        // {
        //     content: '',
        //     history: true,
        //     keyboardShortcuts: true,
        //     inputRules: true,
        //     plugins: [], //https://prosemirror.net/docs/guide/#state
        //     schema, //https://prosemirror.net/examples/schema/
        //     nodeViews: {}, //https://prosemirror.net/docs/guide/#state,
        //     attributes: {}, // https://prosemirror.net/docs/ref/#view.EditorProps.attributes
        //     linkValidationPattern: '',
        //     parseOptions: {}, // https://prosemirror.net/docs/ref/#model.ParseOptions
        // }
    );
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

    public list_type_event: any[] = [
        {
            id: 1,
            type_event: 'Formation'
        },
        {
            id: 2,
            type_event: 'Activité'
        },

    ];

    public is_upload_file: string | ArrayBuffer | null = '';

    // VARCHAR
    public is_loading_img: boolean = false;
    public is_status_img: string = '';

    constructor(
        private _message: ToastService,
        private _request: BannersService,
        private _request_type_event: TypeEventsService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject(PLATFORM_ID) public _plateFormId: Object,
        @Inject(DOCUMENT) public _document: Document,
        private _dialogRef: MatDialogRef<CuBannersComponent>,
    ){}

    // __ ON INIT 🍀 //
    ngOnInit(): void {
        this.editor.registerPlugin(plugin);
        if (this.data != undefined || null) {
            if (this.data.type == "add") {
                this.form_type = this.data.type;
            } else if (this.data.type == "edit") {
                this.form_type = this.data.type;
                const data = this.data.content;
                this.itemId = data.id;
                this.item_url = data.url;
                this.item_description = data.description;
                this.item_libelle = data.libelle;
                this.item_type_event = data.type_event;
                this.item_type_event_id = data.type_event_id;
                this.item_files = data.files;
            }
            // this.getListTypeEvent();
        }
    }
    // __ ON AFTER VIEW 🍀 //
    ngAfterViewInit(): void {

    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // __ GET __ 🍀🍀
    getListTypeEvent() {
        // list_event
        this.unscribe.add(
            this._request_type_event.get().subscribe(
                {
                    next: (resp: any) => {
                        if (resp) {
                            this.list_type_event = resp;
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
    // __ ADD __ 🍀🍀
    addNewItem() {
        const formData = new FormData;
        formData.append('description', this.adminForms.value.description);
        formData.append('libelle', this.adminForms.value.libelle);
        formData.append('files', this.adminForms.value.files);

        this.unscribe.add(
            this._request.add(formData).subscribe(
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
        formData.append('description', this.adminForms.value.description);
        formData.append('libelle', this.adminForms.value.libelle);
        formData.append('files', this.adminForms.value.files);

        this.unscribe.add(
            this._request.update(formData, this.data.content.slug).subscribe(
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
    // selectRole(e: any){
    //     this.
    // }
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
        // return new Observable<string | ArrayBuffer | null>(observer => {
        //     const reader = new FileReader();
        //     reader.onload = () => {
        //         observer.next(reader.result); // Émet le résultat de la lecture
        //         observer.complete(); // Termine l'Observable
        //     };
        //     reader.onerror = (error) => {
        //         observer.error(error); // Émet une erreur si la lecture échoue
        //     };
        //     reader.readAsDataURL(file); // Commence la lecture du fichier
        // });
    }
    // __ UPLOAD FILE 🍀 //
    uploadFile(e: Event){
        if(isPlatformBrowser(this._plateFormId)){
            const input = e.target as HTMLInputElement;
            const file = input.files?.[0];
            if (file) {
                this.readFileAsDataURL(file).subscribe({
                    next: (dataURL) => {
                        this.is_upload_file = dataURL;
                    },
                    error: (err) => {
                        console.error(err);
                    }
                });
            }
        }
    }
   // __ CHOOSING IF ADD IMG 🍀 //
    isAddImg(e: MatRadioChange){
        if(e){
            if(e.value == "yes"){
                this.is_loading_img = true;
                // console.log('e', e.value)
                setTimeout(() => {
                    this.is_loading_img = false;
                    setTimeout(() => {
                        this.is_status_img = e.value;
                    }, 500);
                }, 1000);
            }else{
                this.is_status_img = e.value;
            }
        }
    }
// __------__ 🍀🍀🍀🍀🍀__---   🍀 END EVENT 🍀   ---__ 🍀🍀🍀🍀🍀__------__//


   // __ ON DESTROY 🍀 //
    ngOnDestroy(): void {
        this.editor.destroy();
        this.unscribe.unsubscribe();
    }
}
