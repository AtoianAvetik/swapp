import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

export const selectAppState = createFeatureSelector<AppState>('app');

export const appDataLoading = createSelector(
    selectAppState,
    appState => appState.appDataLoading
);




