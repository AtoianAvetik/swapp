import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { FilmsActions, FilmsActionTypes } from './films.actions';
import { Film } from './models/film';


export const filmsFeatureKey = 'films';

export interface FilmsState extends EntityState<Film> {
    filmsLoaded: boolean;
}

export const adapter: EntityAdapter<Film> =
    createEntityAdapter<Film>();

export const initialState: FilmsState = adapter.getInitialState({
    filmsLoaded: false
});

export function filmsReducers(state = initialState, action: FilmsActions): FilmsState {
    switch (action.type) {
        case FilmsActionTypes.FILMS_LOADED:
            return adapter.addAll(action.payload.films, {...state, filmsLoaded: true});
        default:
            return state;
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal

} = adapter.getSelectors();
