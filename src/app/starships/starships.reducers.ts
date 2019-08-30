import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { StarshipsActions, StarshipsActionTypes } from './starships.actions';
import { Starship } from './models/starship';


export const starshipsFeatureKey = 'starships';

export interface StarshipsState extends EntityState<Starship> {
    starshipsLoaded: boolean;
}

export const adapter: EntityAdapter<Starship> =
    createEntityAdapter<Starship>();

export const initialState: StarshipsState = adapter.getInitialState({
    starshipsLoaded: false
});

export function starshipsReducers(state = initialState, action: StarshipsActions): StarshipsState {
    switch (action.type) {
        case StarshipsActionTypes.STARSHIPS_LOADED:
            return adapter.addAll(action.payload.starships, {...state, starshipsLoaded: true});
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
