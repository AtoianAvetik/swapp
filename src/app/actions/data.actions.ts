import { Action } from '@ngrx/store';

export enum DataActionTypes {
    DATA_LOADING_STARTED = '[Data service] Data loading started',
    DATA_LOADED = '[Data service] Data loaded',
}

export class DataLoadingStarted implements Action {
    readonly type = DataActionTypes.DATA_LOADING_STARTED;
}

export class DataLoaded implements Action {
    readonly type = DataActionTypes.DATA_LOADED;
}


export type DataActions = DataLoadingStarted
    | DataLoaded;
