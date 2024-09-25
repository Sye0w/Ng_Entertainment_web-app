import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { MediaActions } from './media.actions';
import { FetchDataService } from '../../services/fetch-data.service';
import { selectAllMedia } from './media.selectors';
import { Store } from '@ngrx/store';
import { IMediaItem } from './../media.interface';

@Injectable()
export class MediaEffects {
  loadMedias$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MediaActions.loadMedias),
      withLatestFrom(this.store.select(selectAllMedia)),
      switchMap(([_, medias]) => {
        if (medias.length > 0) {
          return of(MediaActions.loadMediasSuccess({ medias }));
        } else {
          return this.fetchService.fetchData().pipe(
            map((medias: IMediaItem[]) => MediaActions.loadMediasSuccess({ medias })),
            catchError(error => of(MediaActions.loadMediasFail({ error: error.message })))
          );
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private fetchService: FetchDataService
  ) {}
}
