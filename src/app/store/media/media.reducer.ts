import { createReducer, on } from '@ngrx/store';
import { MediaActions } from './media.actions';
import {  mediaAdapter, initialState } from './media.state';

export const mediaReducer = createReducer(
  initialState,
  on(MediaActions.loadMedias, (state) => ({ ...state, loading: true })),
  on(MediaActions.loadMediasSuccess, (state, { medias }) =>
    mediaAdapter.setAll(medias, { ...state, loading: false })
  ),
  on(MediaActions.loadMediasFail, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(MediaActions.toggleBookmark, (state, { id }) =>
    mediaAdapter.updateOne(
      {
        id,
        changes: {
          isBookmarked: !state.entities[id]?.isBookmarked
        }
      },
      state
    )
  )
);
