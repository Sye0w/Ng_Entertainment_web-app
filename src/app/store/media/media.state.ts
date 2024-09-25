import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { IMediaItem } from './../media.interface';

export interface MediaState extends EntityState<IMediaItem> {
  loading: boolean;
  error: string | null;
}

export const mediaAdapter = createEntityAdapter<IMediaItem>({
  selectId: (media: IMediaItem) => media.title,
  sortComparer: false,
});

export const initialState: MediaState = mediaAdapter.getInitialState({
  loading: false,
  error: null
});
