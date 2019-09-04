import { DataActions, DataActionTypes } from '../actions/data.actions';


export const appFeatureKey = 'data';

export interface DataState {
    dataLoading: boolean;
}

export const initialState: DataState = {
    dataLoading: false,
};

export function dataReducer(state = initialState, action: DataActions): DataState {
    switch (action.type) {
        case DataActionTypes.DATA_LOADING_STARTED:
            return {...state, dataLoading: true};
        case DataActionTypes.DATA_LOADED:
            return {...state, dataLoading: false};
        default:
            return state;
    }
}
