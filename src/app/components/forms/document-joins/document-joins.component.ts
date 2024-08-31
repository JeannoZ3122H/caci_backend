import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
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

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';

import { MaterialModule } from '../../../material-module';
import { AuthService } from '../../../services/auth/auth.service';
import {
  InfoPratiqueService,
} from '../../../services/request/info-pratique/info-pratique.service';
import {
  LsSecureService,
} from '../../../services/secure/ls-secure/ls-secure.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
    selector: 'app-document-joins',
    standalone: true,
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NgxPaginationModule
    ],
    templateUrl: './document-joins.component.html',
    styleUrl: './document-joins.component.css'
})
export class DocumentJoinsComponent implements OnInit, OnDestroy {

    private unscribe = new Subscription();
    p: number = 1;

    public is_old_upload = false;
    public show_content: any = '';
    public elmnt_content: any = '';
    public title_content: any = '';
    public current_data: any = '';
    public item_data: any = '';
    public illustration!: File;

    public forms: FormGroup = new FormGroup<{
        title: FormControl<string | null>,
        libelle_document: FormControl<string | null>,
    }>(
        {
            title: new FormControl(null, [
                Validators.required,
                Validators.minLength(4)
            ]),
            libelle_document: new FormControl(null, [
                Validators.required,
                Validators.minLength(4)
            ]),
        }
    );
    public list_document_joins: any[] = [];

    constructor(
        private _message: ToastService,
        private _request: InfoPratiqueService,
        // private _traitement: TraitmentsService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<DocumentJoinsComponent>,
        private _loading: NgxUiLoaderService,
        private _ls: LsSecureService,
        private _auth: AuthService
    ){}

    ngOnInit(): void {
        if(this.data != undefined || null){
            this.show_content = this.data.type;
            this.current_data = this.data.content;
            this.elmnt_content = this.data.element;
            this.title_content = this.data.title;
        }
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//
    // __ 🍀🍀
    getListDocumentJoinsByContent(){
        this.unscribe.add(
            this._request.getDocumentJoinByCodeRef(
                this.current_data
            ).subscribe(
                {
                    next: (resp: any) => {
                        if (resp) {
                            this.list_document_joins = resp;
                        }
                    },
                    error: (err: any) => {
                        if (err.status == 401) {
                            this._auth.autoLogOut();
                        }
                    }
                }
            )
        );
    }
    // __ 🍀🍀
    add() {
        const formData: FormData = new FormData();
        formData.append('title', this.forms.value.title);
        formData.append('libelle_document', this.forms.value.libelle_document);
        formData.append('code_ref_libelle', this.current_data);
        formData.append('author_id', this._ls.getDataToStorage().id);
        formData.append('illustration', this.illustration);
        this._loading.start();
        this.unscribe.add(
            this._request.addJoinDocument(formData).subscribe(
                {
                    next: (resp: any) => {
                        if(resp.code == 100){
                            this._loading.stop();
                            this._message.showSuccess(resp);
                            setTimeout(()=>{
                                this.forms.setValue(
                                    {
                                        title: this.forms.value.title,
                                        libelle_document: '',
                                    }
                                );
                                this.is_old_upload = true;
                            }, 1000);
                        }else if(resp.code == 302){
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
    // __ 🍀🍀
    edit() {
        const formData: FormData = new FormData();
        formData.append('title', this.forms.value.title);
        formData.append('libelle_document', this.forms.value.libelle_document);
        formData.append('code_ref_libelle', this.current_data);
        formData.append('author_id', this._ls.getDataToStorage().id);
        formData.append('illustration', this.illustration);

        this._loading.start();
        this.unscribe.add(
            this._request.updateJoinDocument(formData, this.item_data.slug).subscribe(
                {
                    next: (resp: any) => {
                        if(resp.code == 200){
                            this._loading.stop();
                            this._message.showSuccess(resp);
                            setTimeout(()=>{
                                this._dialogRef.close(true);
                            }, 1000);
                        }else if(resp.code == 302){
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
    delete(slg: string){
        this._loading.start();
        this.unscribe.add(
            this._request.deleteJoinDocument(slg).subscribe(
                {
                    next: (resp: any) => {
                        if (resp.code == 100) {
                            this._loading.stop();
                            this._message.showSuccess(resp);
                            setTimeout(() => {
                                this.getListDocumentJoinsByContent();
                            }, 500);
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
                    }
                }
            )
        )
    }
// __------__ 🍀🍀🍀🍀🍀__---   🍀 END REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//
    //
    changeContent(type: string){
        this._loading.start();
        setTimeout(()=>{
            this.show_content = type;
            if(type == "edit"){
                this.getListDocumentJoinsByContent();
            }
            this._loading.stop();
        }, 1000);
    }
    onChange(e: any){
        if(e){
            this.illustration = e.target.files[0];
            console.log('file', e.target.files[0])
            // this._traitement.checkImageType(e.target.files[0]);

            // if(resp){
            //     // this.files = data;
            //     // if (data) {
            //     //     const reader = new FileReader();
            //     //     reader.onload = (e: any) => {
            //     //         // this.selectedFiles.push(file);
            //     //         this.imgUploadList.push({src: e.target.result});
            //     //     };
            //     //     reader.readAsDataURL(data);
            //     // }
            // }else if(resp == "is_not_image"){
            //     this._message.showError({status: "Attention", message: "Veuillez sélectionner uniquement des images."});
            // }else{
            //     this._message.showWarning({status: "Attention", message: "Veuillez sélectionner uniquement des images dont la taille maximale est de 1Mo."});
            // }
        }
    }
    //
    editItem(data: any){
        this._loading.start();
        setTimeout(()=>{
            this.item_data = data;
            this.forms.setValue({
                title: data.title,
                libelle_document: data.libelle_document,
            })
            this._loading.stop();
        }, 1000);
    }

    ngOnDestroy(): void {
        this.unscribe.unsubscribe();
    }
}
