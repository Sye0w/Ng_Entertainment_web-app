import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MediaSelectors from '../store/media/media.selectors';
import { MediaActions } from '../store/media/media.actions';


@Injectable({
  providedIn: 'root'
})

export class MediaFacadeService {
  mediasAll$ = this.store.select(MediaSelectors.selectNonTrendingMedia);
  movies$  = this.store.select(MediaSelectors.selectMediaByMovies)
  series$  = this.store.select(MediaSelectors.selectMediaBySeries)
  bookmarks$ = this.store.select(MediaSelectors.selectMediaBookmarks)
  trending$ = this.store.select(MediaSelectors.selectMediaByTrending)

  constructor(private store: Store) { }

  loadMedias(){
    this.store.dispatch(MediaActions.loadMedias());
  }
}
