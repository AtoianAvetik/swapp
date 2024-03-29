import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { CharactersActions, CharactersActionTypes } from './characters.actions';
import { Character } from './models/character';


export const charactersFeatureKey = 'characters';

export interface CharactersState extends EntityState<Character> {
    charactersLoaded: boolean;
    filteredCharacters: Character[];
    pageIndex: number;
}

export const adapter: EntityAdapter<Character> =
    createEntityAdapter<Character>();

export const initialState: CharactersState = adapter.getInitialState({
    charactersLoaded: false,
    filteredCharacters: [],
    pageIndex: 0,
});

export function charactersReducers(state = initialState, action: CharactersActions): CharactersState {
    switch (action.type) {
        case CharactersActionTypes.CHARACTERS_LOADED:
            return adapter.addAll(action.payload.characters, {...state, charactersLoaded: true});
        case CharactersActionTypes.CHARACTERS_PAGE_CHANGED:
            return {...state, pageIndex: action.payload.pageIndex};
        case CharactersActionTypes.CHARACTERS_FILTERED:
            const filters = action.payload.filter;
            const filteredCharacters = Array.from(Object.keys(state.entities), k => state.entities[k])
                .filter(item => {
                    for (const key in filters) {
                        if (filters.hasOwnProperty(key)) {
                            if (Array.isArray(filters[key]) && filters[key].length === 2) { // check range filter
                                if (parseInt(item[key], 10) < Number(filters[key][0])
                                    || parseInt(item[key], 10) > Number(filters[key][1])) {
                                    return false;
                                }
                            }

                            if (Array.isArray(item[key]) && filters[key] !== '') {
                                if ( !item[key].length ) {
                                    return false;
                                }
                                if (!item[key].find(v => v.id === filters[key])) {
                                    return false;
                                }
                            }
                        }
                    }
                    return true;
                });
            return {...state, filteredCharacters};
        default:
            return state;
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal

} = adapter.getSelectors();
