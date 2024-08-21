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

import { Subscription } from 'rxjs';

import { MaterialModule } from '../../../material-module';
import {
  TypeEventsService,
} from '../../../services/request/type-events/type-events.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
    selector: 'app-cu-type-event',
    standalone: true,
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
    ],
    templateUrl: './cu-type-event.component.html',
    styleUrl: './cu-type-event.component.css'
})
export class CuTypeEventComponent implements OnInit, OnDestroy {

    private unscribe = new Subscription();

    public form_type: any = '';

    public id_current_type_event!: number;
    public libelle_current_type_event: any = '';
    public forms: FormGroup = new FormGroup<{
        type_event: FormControl<string | null>
    }>(
        {
            type_event: new FormControl('', [
                Validators.required,
                Validators.minLength(4),
                Validators.pattern('^[a-zA-Z0-9_.àâäéèêëîïôöùûüÿçÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ-]*$')
            ])
        }
    );

    constructor(
        private _message: ToastService,
        private _request: TypeEventsService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<CuTypeEventComponent>
    ){}

    ngOnInit(): void {
        if (this.data != undefined || null) {
            if (this.data.type == "add") {
                this.form_type = this.data.type;
            } else if (this.data.type == "edit") {
                this.form_type = this.data.type;
                const data = this.data.content;
                this.id_current_type_event = data.id;

                this.forms.setValue({
                    type_event: data.type_event
                });
            }
        }
    }


// __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---get all admin account__ 🍀🍀
    addNewTypeEvent() {
        const data: any = {
            type_event: this.forms.get('type_event')?.value,
        }
        this.unscribe.add(
            this._request.add(data).subscribe(
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
    // ---get all admin account__ 🍀🍀
    editCurrentTypeEvent() {
        const data: any = {
            type_event: this.forms.get('type_event')?.value,
        }
        this.unscribe.add(
            this._request.update(data, this.data.content.slug).subscribe(
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

    ngOnDestroy(): void {
        this.unscribe.unsubscribe();
    }
}
