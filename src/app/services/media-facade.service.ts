import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as MediaSelectors from '../store/media/media.selectors';
import { map, combineLatest, Observable } from 'rxjs';
import { getRouterSelectors, RouterReducerState } from '@ngrx/router-store';
import { MediaActions } from '../store/media/media.actions';
import { IMediaItem } from '../store/media.interface';

@Injectable({
  providedIn: 'root'
})
export class MediaFacadeService {
  routerSelectors = getRouterSelectors();
  private mediasAll$ = this.store.select(MediaSelectors.selectAllMedia);
  private movies$ = this.store.select(MediaSelectors.selectMediaByMovies);
  private series$ = this.store.select(MediaSelectors.selectMediaBySeries);
  private bookmarks$ = this.store.select(MediaSelectors.selectMediaBookmarks);
  searchParam$ = this.store.pipe(select(this.routerSelectors.selectQueryParams))
  currentRoute$ = this.store.pipe(select(this.routerSelectors.selectUrl))

  constructor(
    private store: Store<RouterReducerState>,
  ) {

  }

  loadMedias(){
    this.store.dispatch(MediaActions.loadMedias());
  }


  toggleBookmark(title: string) {
    this.store.dispatch(MediaActions.toggleBookmark({ id: title }));
  }

  getFilteredMedia(category: 'all' | 'movies' | 'series' | 'bookmarks'): Observable<IMediaItem[]> {
    return combineLatest([
     this.searchParam$,
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

  isRouteActive(route: string): Observable<boolean> {
    return this.currentRoute$.pipe(
      map(currentUrl => currentUrl.startsWith(route))
    );
  }
}
