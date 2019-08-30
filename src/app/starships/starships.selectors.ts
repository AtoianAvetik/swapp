import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromStarships from './starships.reducers';

import { StarshipsState } from './starships.reducers';

export const selectStarshipsState = createFeatureSelector<StarshipsState>('starships');

export const selectStarships = createSelector(
    selectStarshipsState,
    fromStarships.selectAll
);

export const starshipsLoaded = createSelector(
    selectStarshipsState,
    starshipsState => starshipsState.starshipsLoaded
);




