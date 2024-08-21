import { registerLocaleData } from '@angular/common';
import {
  HttpClient,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
} from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideAnimationsAsync,
} from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { NgxEditorModule } from 'ngx-editor';
import { NgxFullCalendarModule } from 'ngx-fullcalendar';
import { NgxPaginationModule } from 'ngx-pagination';
import { provideToastr } from 'ngx-toastr';
import {
  NgxUiLoaderConfig,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
} from 'ngx-ui-loader';

import {
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { MaterialModule } from './material-module';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    "bgsColor": "#162f77",
    "bgsOpacity": 0.5,
    "bgsPosition": "bottom-right",
    "bgsSize": 60,
    "bgsType": "ball-spin-clockwise",
    "blur": 8,
    "delay": 0,
    "fastFadeOut": true,
    "fgsColor": "#162f77",
    "fgsPosition": "top-center",
    "fgsSize": 60,
    "fgsType": "chasing-dots",
    "gap": 24,
    "logoPosition": "center-center",
    "logoSize": 50,
    "logoUrl": "assets/img/logo-light.png",
    "masterLoaderId": "master",
    "overlayBorderRadius": "0",
    "overlayColor": "rgba(40, 40, 40, 0.8)",
    "pbColor": "#162f77",
    "pbDirection": "ltr",
    "pbThickness": 3,
    "hasProgressBar": true,
    "text": "",
    "textColor": "#FFFFFF",
    "textPosition": "center-center",
    "maxTime": -1,
    "minTime": 300
};

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        provideRouter(routes),
        provideClientHydration(),
        provideHttpClient(withFetch()),
        // provideHttpClient(withFetch(), withInterceptors([authInterceptorInterceptor])),
        provideAnimationsAsync(),
        MaterialModule,
        importProvidersFrom(
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            }),
            NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
            NgxUiLoaderRouterModule,
            NgxPaginationModule,
            NgxFullCalendarModule,
            NgxEditorModule.forRoot({
                locals: {
                    // menu
                    bold: 'Bold',
                    italic: 'Italic',
                    code: 'Code',
                    underline: 'Underline',
                    strike: 'Strike',
                    blockquote: 'Blockquote',
                    bullet_list: 'Bullet List',
                    ordered_list: 'Ordered List',
                    heading: 'Heading',
                    h1: 'Header 1',
                    h2: 'Header 2',
                    h3: 'Header 3',
                    h4: 'Header 4',
                    h5: 'Header 5',
                    h6: 'Header 6',
                    align_left: 'Left Align',
                    align_center: 'Center Align',
                    align_right: 'Right Align',
                    align_justify: 'Justify',
                    text_color: 'Text Color',
                    background_color: 'Background Color',
                    horizontal_rule: 'Horizontal rule',
                    format_clear: 'Clear Formatting',
                    insertLink: 'Insert Link',
                    removeLink: 'Remove Link',
                    insertImage: 'Insert Image',
                    indent: 'Increase Indent',
                    outdent: 'Decrease Indent',
                    superscript: 'Superscript',
                    subscript: 'Subscript',
                    undo: 'Undo',
                    redo: 'Redo',

                    // pupups, forms, others...
                    url: 'URL',
                    text: 'Text',
                    openInNewTab: 'Open in new tab',
                    insert: 'Insert',
                    altText: 'Alt Text',
                    title: 'Title',
                    remove: 'Remove',
                    enterValidUrl: 'Please enter a valid URL',
                },
            })
        ),
        provideToastr({
            timeOut: 1000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
            maxOpened: 1
        }),
        // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],

};
