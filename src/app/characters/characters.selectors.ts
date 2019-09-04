import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCharacters from './characters.reducers';

import { CharactersState } from './characters.reducers';
import { PageQuery } from './characters.actions';

export const selectCharactersState = createFeatureSelector<CharactersState>('characters');

export const selectCharacters = createSelector(
    selectCharactersState,
    fromCharacters.selectAll
);

export const selectCharacter = (id: number) => createSelector(
    selectCharactersState,
    charactersState => charactersState.entities[id]
);

export const selectFilteredCharacters = createSelector(
    selectCharactersState,
    charactersState => charactersState.filteredCharacters
);

export const charactersLoaded = createSelector(
    selectCharactersState,
    charactersState => charactersState.charactersLoaded
);

export const charactersPageIndex = createSelector(
    selectCharactersState,
    charactersState => charactersState.pageIndex
);

export const selectCharactersPage = (page: PageQuery) => createSelector(
    selectFilteredCharacters,
    filteredCharacters => {

        const start = page.pageIndex * page.pageSize;
        const end = start + page.pageSize;
        return filteredCharacters
            .slice(start, end);

    }
);



