import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { CharactersActions, CharactersActionTypes } from './characters.actions';
import { Character } from './models/character';


export const charactersFeatureKey = 'characters';

export interface CharactersState extends EntityState<Character> {
    charactersLoaded: boolean;
}

export const adapter: EntityAdapter<Character> =
    createEntityAdapter<Character>();

export const initialState: CharactersState = adapter.getInitialState({
    charactersLoaded: false
});

export function charactersReducers(state = initialState, action: CharactersActions): CharactersState {
    switch (action.type) {
        case CharactersActionTypes.CHARACTERS_LOADED:
            return adapter.addAll(action.payload.characters, {...state, charactersLoaded: true});
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
