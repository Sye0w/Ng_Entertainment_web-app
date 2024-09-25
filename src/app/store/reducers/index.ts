import { ActionReducerMap } from "@ngrx/store";
import { MediaState } from "../media/media.state";
import { mediaReducer } from "../media/media.reducer";


export interface AppState {
  media: MediaState;
}


export const appReducers: ActionReducerMap<AppState>={
  media: mediaReducer,
}
