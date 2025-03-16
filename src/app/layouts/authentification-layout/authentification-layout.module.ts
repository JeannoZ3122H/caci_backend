import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'src/app/material-module';
import { AuthComponent } from 'src/app/pages/auth/auth.component';

import {
  AuthentificationLayoutRoutes,
} from './authentification-layout-routing.module';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthentificationLayoutRoutes),
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    NgxCaptchaModule,
    ReactiveFormsModule
  ]
})
export class AuthentificationLayoutModule { }
