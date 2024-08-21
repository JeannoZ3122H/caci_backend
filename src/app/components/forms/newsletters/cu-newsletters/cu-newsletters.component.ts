import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { Subscription } from 'rxjs';

import { MaterialModule } from '../../../../material-module';
import {
  NewslettersService,
} from '../../../../services/request/admin/newsletters/newsletters.service';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
    selector: 'app-cu-newsletters',
    standalone: true,
    imports: [
        MaterialModule,
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './cu-newsletters.component.html',
    styleUrl: './cu-newsletters.component.css'
})
export class CuNewslettersComponent implements OnInit, OnDestroy {

    private unscribe = new Subscription();

    public form_type: any = '';

    public id_current_subscriber_email!: number;
    public libelle_current_subscriber_email: any = '';
    public libelle: FormControl = new FormControl('', [Validators.required, Validators.email ]);

    constructor(
        private _message: ToastService,
        private _request: NewslettersService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<CuNewslettersComponent>
    ) { }

    ngOnInit(): void {
        if (this.data != undefined || null) {
            if (this.data.type == "add") {
                this.form_type = this.data.type;
            } else if (this.data.type == "edit") {
                this.form_type = this.data.type;
                const data = this.data.content;
                this.id_current_subscriber_email = data.id;
                this.libelle_current_subscriber_email = data.subscriber_email;
            }
        }
    }


    // __------__ 🍀🍀🍀🍀🍀__---   🍀 START REQUEST 🍀   ---__ 🍀🍀🍀🍀🍀__------__//

    // ---edit item__ 🍀🍀
    editCurrentItem() {
        const data: any = {
            subscriber_email: this.libelle.value,
            id: this.id_current_subscriber_email,
        }
        this.unscribe.add(
            this._request.update(data, this.data.content.slug).subscribe(
                {
                    next: (resp: any) => {
                        if (resp.code == 200) {
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
