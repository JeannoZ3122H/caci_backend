import { Injectable } from '@angular/core';

import { environment_prod } from 'src/app/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {

    constructor() { }

    // apiUrl: any = 'http://127.0.0.1:8000/api/v1/';
    apiUrl: any = environment_prod.apiUrl;
    
}
