import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MediaState, mediaAdapter } from './media.state';

// Feature selector
export const selectMediaState = createFeatureSelector<MediaState>('medias');

// Entity selectors
export const {
  selectIds: selectMediaIds,
  selectEntities: selectMediaEntities,
  selectAll: selectAllMedia,
  selectTotal: selectTotalMedia,
} = mediaAdapter.getSelectors(selectMediaState);

export const selectNonTrendingMedia = createSelector(
  selectAllMedia,
  (medias) => medias.filter(media => !media.isTrending)
);

export const selectMediaByTrending = createSelector(
  selectAllMedia,
  (medias) => medias.filter(media => media.isTrending)
);

export const selectMediaBookmarks = createSelector(
  selectAllMedia,
  (medias) => medias.filter(media => media.isBookmarked)
);

export const selectMediaByMovies = createSelector(
  selectAllMedia,
  (medias) => medias.filter(media => media.category === 'Movie')
);

export const selectMediaBySeries = createSelector(
  selectAllMedia,
  (medias) => medias.filter(media => media.category === 'TV Series')
);

export const selectMediaLoading = createSelector(
  selectMediaState,
  (state: MediaState) => state.loading
);

export const selectMediaError = createSelector(
  selectMediaState,
  (state: MediaState) => state.error
);
