import {createFeatureSelector} from '@ngrx/store';

import { FilterState } from './filter.reducers';

export const selectFilterState = createFeatureSelector<FilterState>('filter');




