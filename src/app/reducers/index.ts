import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromApp from '../app.reducer';


export interface State {
  [fromApp.appFeatureKey]: fromApp.AppState;
}

export const reducers: ActionReducerMap<State> = {
    [fromApp.appFeatureKey]: fromApp.appReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
