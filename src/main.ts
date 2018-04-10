import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppConfig } from './app/app.config';

import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

AppConfig.load()
    .then(() => {
        platformBrowserDynamic().bootstrapModule(AppModule);
    });

// platformBrowserDynamic().bootstrapModule(AppModule)
 // .catch(err => console.log(err));
