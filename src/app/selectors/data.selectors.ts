import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from '../reducers/data.reducer';

export const selectDataState = createFeatureSelector<DataState>('data');

export const dataLoading = createSelector(
    selectDataState,
    dataState => dataState.dataLoading
);




