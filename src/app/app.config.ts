import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { MediaEffects } from './store/media/media.effects';
import { mediaReducer } from './store/media/media.reducer';
import { metaReducers } from './store/meta-reducer';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { appReducers } from './store/reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideStore(
      {
        ...appReducers,
        router: routerReducer
      },
      { metaReducers }
    ),
    provideRouterStore(),
    provideEffects(MediaEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
