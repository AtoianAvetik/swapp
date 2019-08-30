import { Action } from '@ngrx/store';
import { Filter } from './models/filter';

export enum FilterActionTypes {
    FILTER_UPDATED = '[Filter component] Filter Updated',
}

export class FilterLoaded implements Action {

    readonly type = FilterActionTypes.FILTER_UPDATED;

    constructor(public payload: { filter: Filter }) {

    }
}

export type FilterActions = FilterLoaded | FilterLoaded;
