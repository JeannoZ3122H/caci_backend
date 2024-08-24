import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  constructor() { }

    fileValidator(control: FormControl): { [key: string]: any } | null {
        const file = control.value;
        if (!file) {return null;}
        const acceptedMimeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];  
        const fileType = file.type;
        return acceptedMimeTypes.includes(fileType) ? null : { invalidFileType: true };
    }
}
