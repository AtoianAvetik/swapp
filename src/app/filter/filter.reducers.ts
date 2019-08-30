import { FilterActions, FilterActionTypes } from './filter.actions';

export const filterFeatureKey = 'filter';

export interface FilterState {
    [key: string]: any;
}


export const initialState: FilterState = {

};

export function filterReducers(state = initialState, action: FilterActions): FilterState {
    switch (action.type) {
        case FilterActionTypes.FILTER_UPDATED:
            return {...state, filter: action.payload.filter};
        default:
            return state;
    }
}
