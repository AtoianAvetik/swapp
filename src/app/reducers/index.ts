import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromData from './data.reducer';


export interface State {
    data: fromData.DataState;
}

export const reducers: ActionReducerMap<State> = {
    data: fromData.dataReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
