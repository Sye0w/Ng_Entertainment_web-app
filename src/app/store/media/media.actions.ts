import { IMediaItem } from './../media.interface';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const MediaActions = createActionGroup({
  source: 'Media',
  events: {
    ' Load Medias': emptyProps(),
    ' Load Medias success': props<{ medias: IMediaItem[]}>(),
    ' Load Medias fail': props<{error: any}>(),
    ' Toggle Bookmark': props<{ id: string }>(),
  }
});
