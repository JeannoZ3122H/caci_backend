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

import { Subscription } from 'rxjs';

import { MaterialModule } from '../../../../material-module';
import {
  BannersService,
} from '../../../../services/request/admin/banners/banners.service';
import {
  TypeEventsService,
} from '../../../../services/request/type-events/type-events.service';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
    selector: 'app-cu-banners',
    standalone: true,
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule
    ],
    templateUrl: './cu-banners.component.html',
    styleUrl: './cu-banners.component.css'
})
export class CuBannersComponent implements OnInit, OnDestroy {

    private unscribe = new Subscription();
    public form_type: any = '';

    public itemId!: number;

    public item_url: any = '';
    public item_description: any = '';
    public item_type_event: any = '';
    public item_type_event_id!: number;
    public item_title: any = '';
    public item_event_img: any;

    adminForms = new FormGroup<{
        url: FormControl<string | any>,
        type_event: FormControl<string | any>,
        description: FormControl<string | any>,
        title: FormControl<string | any>,
        event_img: FormControl<File | any>
    }>
        (
            {
                url: new FormControl('https://google.com', [
                    Validators.required,
                    Validators.pattern('https?://.+')
                ]),
                type_event: new FormControl('', [
                    Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_.-]*$')
                ]),
                description: new FormControl('', [
                    Validators.required,
                    Validators.maxLength(400),
                    Validators.pattern('^[a-zA-Z0-9_.-]*$')
                ]),
                title: new FormControl(0, [
                    Validators.required,
                    Validators.maxLength(250),
                    Validators.pattern('^[a-zA-Z0-9_.-]*$')
                ]),
                event_img: new FormControl('', [
                    Validators.required
                ])
            }
        )

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

    constructor(
        private _message: ToastService,
        private _request: BannersService,
        private _request_type_event: TypeEventsService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject(PLATFORM_ID) public _plateFormId: Object,
        @Inject(DOCUMENT) public _document: Document,
        private _dialogRef: MatDialogRef<CuBannersComponent>,
    ) { }

    ngOnInit(): void {
        if (this.data != undefined || null) {
            if (this.data.type == "add") {
                this.form_type = this.data.type;
            } else if (this.data.type == "edit") {
                this.form_type = this.data.type;
                const data = this.data.content;
                this.itemId = data.id;
                this.item_url = data.url;
                this.item_description = data.description;
                this.item_title = data.title;
                this.item_type_event = data.type_event;
                this.item_type_event_id = data.type_event_id;
                this.item_event_img = data.event_img;
            }
            // this.getListTypeEvent();
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
        formData.append('url', this.adminForms.value.url);
        formData.append('type_event_id', this.adminForms.value.type_event);
        formData.append('description', this.adminForms.value.description);
        formData.append('title', this.adminForms.value.title);
        formData.append('event_img', this.adminForms.value.event_img);

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
    // ---edit__ 🍀🍀
    editCurrentItem() {

        const formData = new FormData;
        formData.append('url', this.adminForms.value.url);
        formData.append('type_event_id', this.adminForms.value.type_event);
        formData.append('description', this.adminForms.value.description);
        formData.append('title', this.adminForms.value.title);
        formData.append('event_img', this.adminForms.value.event_img);

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
    uploadFile(e: any){
        if(isPlatformBrowser(this._plateFormId)){
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.is_upload_file  = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        }
    }
// __------__ 🍀🍀🍀🍀🍀__---   🍀 END EVENT 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    ngOnDestroy(): void {
        this.unscribe.unsubscribe();
    }
}
