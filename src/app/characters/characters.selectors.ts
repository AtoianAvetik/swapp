import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromCharacters from './characters.reducers';

import { CharactersState } from './characters.reducers';
import { PageQuery } from './characters.actions';

export const selectCharactersState = createFeatureSelector<CharactersState>('characters');

export const selectCharacters = createSelector(
    selectCharactersState,
    fromCharacters.selectAll
);

export const charactersLoaded = createSelector(
    selectCharactersState,
    charactersState => charactersState.charactersLoaded
);

export const selectCharactersPage = (page: PageQuery) => createSelector(
    selectCharacters,
    allCharacters => {

        const start = page.pageIndex * page.pageSize;
        const end = start + page.pageSize;
        return allCharacters
            .slice(start, end);

    }
);




