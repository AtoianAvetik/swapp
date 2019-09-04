import { Action } from '@ngrx/store';

export enum AppActionTypes {
    APP_DATA_LOADING_STARTED = '[App] Loading app data started',
    APP_DATA_LOADED = '[App] App data loaded',
}

export class AppDataLoadingStarted implements Action {
    readonly type = AppActionTypes.APP_DATA_LOADING_STARTED;
}

export class AppDataLoaded implements Action {
    readonly type = AppActionTypes.APP_DATA_LOADED;
}


export type AppActions = AppDataLoadingStarted
    | AppDataLoaded;
