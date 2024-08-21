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
import { Subscription } from 'rxjs';

import { MaterialModule } from '../../../../material-module';
import {
  SlideUneImgService,
} from '../../../../services/request/slide-une-img/slide-une-img.service';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
    selector: 'app-cu-slide-une-img',
    standalone: true,
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule
    ],
    templateUrl: './cu-slide-une-img.component.html',
    styleUrl: './cu-slide-une-img.component.css'
})
export class CuSlideUneImgComponent implements OnInit, OnDestroy {

    private unscribe = new Subscription();
    public form_type: any = '';

    public itemId!: number;

    public item_description: any = '';
    public item_slide_img: any;

    forms = new FormGroup<{
        title: FormControl<string | any>,
        description: FormControl<string | any>,
        slide_img: FormControl<File | any>
    }>
        (
            {
                title: new FormControl('', [
                    Validators.required,
                    Validators.maxLength(50)
                ]),
                description: new FormControl('', [
                    Validators.required,
                    Validators.maxLength(400)
                ]),
                slide_img: new FormControl('', [
                    Validators.required
                ])
            }
        )

    public is_upload_file: string | ArrayBuffer | null = '';
    public files!: File;

    constructor(
        private _message: ToastService,
        private _request: SlideUneImgService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject(PLATFORM_ID) public _plateFormId: Object,
        @Inject(DOCUMENT) public _document: Document,
        private _dialogRef: MatDialogRef<CuSlideUneImgComponent>,
        private _loading: NgxUiLoaderService
    ) { }

    ngOnInit(): void {
        if (this.data != undefined || null) {
            if (this.data.type == "add") {
                this.form_type = this.data.type;
            } else if (this.data.type == "edit") {
                this.form_type = this.data.type;
                const data = this.data.content;
                this.itemId = data.id;

                this.forms.setValue({
                    title: data.title,
                    description: data.description,
                    slide_img: data.slide_img
                })
            }
        }
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---add__ 🍀🍀
    addNewItem() {
        const formData = new FormData;
        formData.append('title', this.forms.value.title);
        formData.append('description', this.forms.value.description);
        formData.append('slide_img', this.files);

        this._loading.start();
        this.unscribe.add(
            this._request.add(formData).subscribe(
                {
                    next: (resp: any) => {
                        if(resp.code == 100){
                            this._loading.stop();
                            setTimeout(() => {
                                this._message.showSuccess(resp);
                                this._dialogRef.close(true);
                            }, 2000);
                        }else{
                            this._loading.stop();
                        }
                    },
                    error: (err: any) => {
                        if (err) {
                            this._loading.stop();
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
        formData.append('title', this.forms.value.title);
        formData.append('description', this.forms.value.description);
        formData.append('slide_img', this.files);

        this._loading.start();
        this.unscribe.add(
            this._request.update(formData, this.data.content.slug).subscribe(
                {
                    next: (resp: any) => {
                        if(resp.code == 200){
                            this._loading.stop();
                            setTimeout(() => {
                                this._message.showSuccess(resp);
                                this._dialogRef.close(true);
                            }, 2000);
                        }else{
                            this._loading.stop();
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
    uploadFile(e: any) {
        if (isPlatformBrowser(this._plateFormId)) {
            const file: File = e.target.files[0];
            const maxSize = 1048576; // 1Mo en octets

            if (file.size > maxSize) {
                this._message.showWarning({status: "Attention", message: "Le fichier est trop volumineux. La taille maximale autorisée est de 1Mo."});
                e.target.value = '';
            } else {
                this.files = file;
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e: any) => {
                        this.is_upload_file = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            }
        }
    }

// __------__ 🍀🍀🍀🍀🍀__---   🍀 END EVENT 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    ngOnDestroy(): void {
        this.unscribe.unsubscribe();
    }
}

