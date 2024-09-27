import { MediaState } from './../media/media.state';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap} from '@ngrx/store';
import { mediaReducer } from '../media/media.reducer';


export interface State {
  router: RouterReducerState<any>;
  medias: MediaState
}

export const appReducers: ActionReducerMap<State> = {
  router: routerReducer,
  medias:mediaReducer
};



