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
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  Plugin,
  PluginKey,
} from 'prosemirror-state';
import {
  interval,
  Subject,
  Subscription,
  takeUntil,
} from 'rxjs';

import { MaterialModule } from '../../../../material-module';
import { AuthService } from '../../../../services/auth/auth.service';
import {
  ActualiteService,
} from '../../../../services/request/actualite/actualite.service';
import {
  TypeEventsService,
} from '../../../../services/request/type-events/type-events.service';
import {
  LsSecureService,
} from '../../../../services/secure/ls-secure/ls-secure.service';
import { ToastService } from '../../../../services/toast/toast.service';

const plugin = new Plugin({
    key: new PluginKey('plugin'),
});

@Component({
    selector: 'app-cu-agendas',
    standalone: true,
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NgxEditorModule,
        NgxMatTimepickerModule,
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
        hours_start_event: FormControl<string | any>,
        hours_end_event: FormControl<string | any>,
        date_start_event: FormControl<string | any>,
        date_end_event: FormControl<string | any>,
        status_enter_event: FormControl<string | any>,
        address_event: FormControl<string | any>,
        localisation_event: FormControl<string | any>,
        type_event_id: FormControl<string | any>,
        google_meet_url: FormControl<string | any>,
        illusration_event: FormControl<File | any>
    }>({
        type_event_id: new FormControl('', [
            Validators.minLength(1)
        ]),
        google_meet_url: new FormControl('', [
            Validators.minLength(4),
        ]),
        price: new FormControl('', [
            Validators.minLength(4)
        ]),
        title_event: new FormControl('', [
            Validators.required,
            Validators.minLength(4)
        ]),
        description_event: new FormControl('', [
            Validators.required,
        ]),
        hours_start_event: new FormControl('00:00', [
            Validators.required, Validators.pattern(/^\d{2}:\d{2}$/)
        ]),
        hours_end_event: new FormControl('00:00', [
            Validators.required, Validators.pattern(/^\d{2}:\d{2}$/)
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
        illusration_event: new FormControl(null),
    });
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

    protected localStorage!: Storage | undefined;
    private destroy$ = new Subject<void>();
    imageUrl: string | ArrayBuffer | null = null;
    public file!: File;
    files: any = 'border: 2px dotted gray;';
    public list_type_events: any[] = [];

    constructor(
        private _message: ToastService,
        private _request: ActualiteService,
        private _request_type_event: TypeEventsService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject(DOCUMENT) private _document: Document,
        @Inject(PLATFORM_ID) private _plateFromeID: Document,
        private _dialogRef: MatDialogRef<CuAgendasComponent>,
        private _loading: NgxUiLoaderService,
        private _ls: LsSecureService,
        private _auth: AuthService
    ) { }

    ngOnInit(): void {
        this.editor = new Editor();
        if (this.data != undefined || null) {
            this.localStorage = this._document.defaultView?.localStorage;
            this.editor.registerPlugin(plugin);
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
                        status_enter_event: JSON.parse(data.status_enter_event),
                        address_event: data.address_event,
                        localisation_event: data.localisation_event,
                        type_event_id: data.type_event_id,
                        google_meet_url: data.google_meet_url,
                        hours_start_event: "00:00",
                        hours_end_event: "00:00",
                        price: data.price,
                        illusration_event: null,
                    }
                );
                this.imageUrl = data.illusration_event;
                this.files = `height: 250px;
                    border: 2px dotted gray;
                    background: linear-gradient(190deg, rgba(4,19,61,0.5844931722689075) 12%, rgba(4,19,61,0.248358718487395) 64%), url('${this.imageUrl}')no-repeat center center;
                    background-size: 80%`;
                this.itemId = data.id;
            };
            this.getListTypeEvent();
        }
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---add__ 🍀🍀
    addNewItem() {
        const formData = new FormData();
        formData.append('author_id', this._ls.getDataToStorage().id);
        formData.append('title_event', this.forms.get('title_event')?.value);
        formData.append('description_event', this.forms.get('description_event')?.value);
        formData.append('date_start_event', this.forms.get('date_start_event')?.value);
        formData.append('date_end_event', this.forms.get('date_end_event')?.value);
        formData.append('status_enter_event', this.forms.get('status_enter_event')?.value);
        formData.append('address_event', this.forms.get('address_event')?.value);
        formData.append('hours_start_event', this.forms.get('hours_start_event')?.value);
        formData.append('hours_end_event', this.forms.get('hours_end_event')?.value);
        formData.append('localisation_event', this.forms.get('localisation_event')?.value);
        formData.append('type_event_id', this.forms.get('type_event_id')?.value);
        formData.append('google_meet_url', this.forms.get('google_meet_url')?.value);
        formData.append('price', this.forms.get('price')?.value);
        formData.append('illusration_event', this.file);

        this._loading.start();
        this.unscribe.add(
            this._request.addAgenda(formData).subscribe(
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
    editCurrentItem() {
        const formData = new FormData();
        formData.append('author_id', this._ls.getDataToStorage().id);
        formData.append('title_event', this.forms.get('title_event')?.value);
        formData.append('description_event', this.forms.get('description_event')?.value);
        formData.append('date_start_event', this.forms.get('date_start_event')?.value);
        formData.append('date_end_event', this.forms.get('date_end_event')?.value);
        formData.append('status_enter_event', this.forms.get('status_enter_event')?.value);
        formData.append('address_event', this.forms.get('address_event')?.value);
        formData.append('hours_start_event', this.forms.get('hours_start_event')?.value);
        formData.append('hours_end_event', this.forms.get('hours_end_event')?.value);
        formData.append('localisation_event', this.forms.get('localisation_event')?.value);
        formData.append('type_event_id', this.forms.get('type_event_id')?.value);
        formData.append('google_meet_url', this.forms.get('google_meet_url')?.value);
        formData.append('price', this.forms.get('price')?.value);
        formData.append('illusration_event', this.file);
        this._loading.start();
        this.unscribe.add(
            this._request.updateAgenda(formData, this.data.content.slug).subscribe(
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
    //
    getListTypeEvent(){
        this.unscribe.add(
            this._request_type_event.get().subscribe(
                {
                    next: (resp: any) => {
                        if (resp) {
                            this.list_type_events = resp;
                        }
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
                        hours_start_event: this.forms.value.hours_start_event,
                        hours_end_event: this.forms.value.hours_end_event,
                        date_start_event: this.forms.value.date_start_event,
                        date_end_event: this.forms.value.date_end_event,
                        status_enter_event: this.forms.value.status_enter_event,
                        address_event: this.forms.value.address_event,
                        localisation_event: this.forms.value.localisation_event,
                        type_event_id: this.forms.value.type_event_id,
                        google_meet_url: this.forms.value.google_meet_url,
                        illusration_event: null,
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
                    hours_start_event: data.hours_start_event,
                    hours_end_event: data.hours_end_event,
                    localisation_event: data.localisation_event,
                    type_event_id: data.type_event_id,
                    google_meet_url: data.google_meet_url,
                    illusration_event: null,
                });
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

