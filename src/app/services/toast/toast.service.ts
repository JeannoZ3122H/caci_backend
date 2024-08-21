import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private toastr: ToastrService) { }

    showSuccess = (data: any) => {
        return this.toastr.success(data.message, data.status, {
            timeOut: 2000,
            positionClass: 'toast-top-right'
        });
    }

    showError = (data: any) => {
        return this.toastr.error(data.message, data.status, {
            timeOut: 2000,
            positionClass: 'toast-top-right'
        });
    }

    showInfo = (data: any) => {
        return this.toastr.info(data.message, data.status, {
            timeOut: 2000,
            positionClass: 'toast-top-right'
        });
    }

    showWarning = (data: any) => {
        return this.toastr.warning(data.message, data.status, {
            timeOut: 2000,
            positionClass: 'toast-top-right'
        });
    }

    show = (data: any) => {
        return this.toastr.show(data.message, data.title, {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
        });
    }
}
