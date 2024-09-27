import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router'; // REMOVED: ActivatedRoute
import * as MediaSelectors from '../store/media/media.selectors';
import { map, combineLatest, Observable } from 'rxjs'; // ADDED: Observable
import { getRouterSelectors, RouterReducerState } from '@ngrx/router-store';
import { MediaActions } from '../store/media/media.actions';

@Injectable({
  providedIn: 'root'
})
export class MediaFacadeService {
  private mediasAll$ = this.store.select(MediaSelectors.selectNonTrendingMedia);
  private movies$ = this.store.select(MediaSelectors.selectMediaByMovies);
  private series$ = this.store.select(MediaSelectors.selectMediaBySeries);
  private bookmarks$ = this.store.select(MediaSelectors.selectMediaBookmarks);
  trending$ = this.store.select(MediaSelectors.selectMediaByTrending);


  private routerSelectors = getRouterSelectors();

  constructor(
    private store: Store<RouterReducerState>,
    private router: Router
  ) {}

  loadMedias(){
    this.store.dispatch(MediaActions.loadMedias());
  }

  getFilteredMedia(category: 'all' | 'movies' | 'series' | 'bookmarks'): Observable<any[]> {
    return combineLatest([
      this.store.pipe(select(this.routerSelectors.selectQueryParams)),
      this.getMediaObservable(category)
    ]).pipe(
      map(([params, media]) => {
        const searchTerm = params['search']?.toLowerCase();
        if (!searchTerm) return media;
        return media.filter(item =>
          item.title.toLowerCase().includes(searchTerm)
        );
      })
    );
  }

    private getMediaObservable(category: 'all' | 'movies' | 'series' | 'bookmarks'): Observable<any[]> {
    switch (category) {
      case 'movies': return this.movies$;
      case 'series': return this.series$;
      case 'bookmarks': return this.bookmarks$;
      default: return this.mediasAll$;
    }
  }
}
