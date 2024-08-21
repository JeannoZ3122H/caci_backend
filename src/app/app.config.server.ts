import { registerLocaleData } from '@angular/common';
import {
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import {
  ApplicationConfig,
  LOCALE_ID,
  mergeApplicationConfig,
} from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideAnimationsAsync,
} from '@angular/platform-browser/animations/async';
import { provideServerRendering } from '@angular/platform-server';
import { provideRouter } from '@angular/router';

import { appConfig } from './app.config';
import { routes } from './app.routes';

registerLocaleData(localeFr);

const serverConfig: ApplicationConfig = {
    providers: [
        provideServerRendering(),
        provideRouter(routes),
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
        NoopAnimationsModule
    ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
