import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromFilms from './films.reducers';

import { FilmsState } from './films.reducers';

export const selectFilmsState = createFeatureSelector<FilmsState>('films');

export const selectFilms = createSelector(
    selectFilmsState,
    fromFilms.selectAll
);

export const filmsLoaded = createSelector(
    selectFilmsState,
    filmsState => filmsState.filmsLoaded
);




