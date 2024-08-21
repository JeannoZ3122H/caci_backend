import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
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
import {
  Plugin,
  PluginKey,
} from 'prosemirror-state';
import { Subscription } from 'rxjs';

import { MaterialModule } from '../../../../material-module';
import {
  RoleService,
} from '../../../../services/request/admin/role/role.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { CuRoleComponent } from '../../role/cu-role/cu-role.component';

const plugin = new Plugin({
    key: new PluginKey('plugin'),
});

@Component({
    selector: 'app-cu-terms-and-conditions',
    standalone: true,
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NgxEditorModule
    ],
    templateUrl: './cu-terms-and-conditions.component.html',
    styleUrl: './cu-terms-and-conditions.component.css'
})
export class CuTermsAndConditionsComponent implements OnInit, OnDestroy {

    private unscribe = new Subscription();

    public form_type: any = '';

    public id_current_terms!: number;
    public libelle_current_terms: any = '';

    editor: Editor =  new Editor(
        {
            content: '',
            history: true,
            keyboardShortcuts: true,
            inputRules: true,
            plugins: [],
            schema,
            nodeViews: {},
            attributes: {},
            linkValidationPattern: '',
            parseOptions: {},
        }
    );
    html: string = '';
    toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        [{ link: { showOpenInNewTab: false } }, 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
        ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
        ['superscript', 'subscript'],
        ['undo', 'redo'],
    ];
    colorPresets = ['red', '#FF0000', 'rgb(255, 0, 0)'];

    constructor(
        private _message: ToastService,
        private _request: RoleService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<CuRoleComponent>
    ) { }

    ngOnInit(): void {
        if(this.data != undefined || null){
            this.editor.registerPlugin(plugin);
            if(this.data.type == "add"){
                this.form_type = this.data.type;
            }else if(this.data.type == "edit"){
                this.form_type = this.data.type;
                const data = this.data.content;
                this.id_current_terms = data.id;
                this.libelle_current_terms = data.role;
            }
        }
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // --- Submit Add Forms __ 🍀🍀
    submitAddForms() {
        const data: any = {
            // libelle: this.libelle.value
        }
        this.unscribe.add(
            this._request.add(data).subscribe(
                {
                    next: (resp: any) => {
                        if(resp.code == 100){
                            this._message.showSuccess(resp);

                            setTimeout(()=>{
                                this._dialogRef.close(true);
                            }, 2000);
                        }
                    },
                    error: (err: any) => {
                        if(err){
                            this._message.showError(err);
                        }
                    },
                }
            )
        )
    }
    // --- Submit Edit Forms __ 🍀🍀
    submitEditForms() {
        const data: any = {
            // libelle: this.libelle.value,
            // id: this.id_current_role,
        }
        this.unscribe.add(
            this._request.update(data, this.data.content.slug).subscribe(
                {
                    next: (resp: any) => {
                        if(resp.code == 200){
                            this._message.showSuccess(resp);

                            setTimeout(()=>{
                                this._dialogRef.close(true);
                            }, 2000);
                        }
                    },
                    error: (err: any) => {
                        if(err){
                            this._message.showError(err);
                        }
                    },
                }
            )
        )
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 END REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    ngOnDestroy(): void {
        this.editor.destroy();
        this.unscribe.unsubscribe();
    }
}