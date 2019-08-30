import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { SpeciesActions, SpeciesActionTypes } from './species.actions';
import { Species } from './models/species';


export const speciesFeatureKey = 'species';

export interface SpeciesState extends EntityState<Species> {
    speciesLoaded: boolean;
}

export const adapter: EntityAdapter<Species> =
    createEntityAdapter<Species>();

export const initialState: SpeciesState = adapter.getInitialState({
    speciesLoaded: false
});

export function speciesReducers(state = initialState, action: SpeciesActions): SpeciesState {
    switch (action.type) {
        case SpeciesActionTypes.SPECIES_LOADED:
            return adapter.addAll(action.payload.species, {...state, speciesLoaded: true});
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
