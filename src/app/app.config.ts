import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { MediaEffects } from './store/media/media.effects';
import { mediaReducer } from './store/media/media.reducer';

export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({
    keys: ['medias'],
    rehydrate: true
  })(reducer);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(localStorageSyncReducer),
    provideState({ name: 'medias', reducer: mediaReducer }),
    provideEffects(MediaEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
