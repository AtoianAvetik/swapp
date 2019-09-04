import { AppActions, AppActionTypes } from './app.actions';

export const appFeatureKey = 'app';

export interface AppState {
    appDataLoading: boolean;
}

export const initialState: AppState = {
    appDataLoading: false,
};

export function appReducer(state = initialState, action: AppActions): AppState {
    switch (action.type) {
        case AppActionTypes.APP_DATA_LOADING_STARTED:
            return {...state, appDataLoading: true};
        case AppActionTypes.APP_DATA_LOADED:
            return {...state, appDataLoading: false};
        default:
            return state;
    }
}
