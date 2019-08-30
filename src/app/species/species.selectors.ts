import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromSpecies from './species.reducers';

import { SpeciesState } from './species.reducers';

export const selectSpeciesState = createFeatureSelector<SpeciesState>('species');

export const selectSpecies = createSelector(
    selectSpeciesState,
    fromSpecies.selectAll
);

export const speciesLoaded = createSelector(
    selectSpeciesState,
    speciesState => speciesState.speciesLoaded
);




