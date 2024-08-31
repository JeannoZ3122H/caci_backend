import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TraitmentsService {

    constructor() { }


    checkSize = (data: any): boolean => {
        let resp: boolean = false;
        if(data){
            const maxSize = 1048576; // 1Mo en octets
            if (data.size > maxSize) {
                resp = false;
            } else {
                resp = true;
            }
        }
        return resp;
    }

    checkImageType = (files: any): string =>{
        let resp: string = '';
        const file: File = files;
        if (file.type.match('image.*')) {
            this.checkSize(files);
            resp = "image";
        } else {
            resp = "is_not_image";
        }
        return resp;
    }
}
