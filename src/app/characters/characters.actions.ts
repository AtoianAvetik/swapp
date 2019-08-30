import { Action } from '@ngrx/store';
import { Character } from './models/character';

export enum CharactersActionTypes {
    CHARACTERS_REQUESTED = '[Characters page] All Characters Requested',
    CHARACTERS_LOADED = '[Characters service] All Characters Loaded',
}

export interface PageQuery {
    pageIndex: number;
    pageSize: number;
}

export class CharactersRequested implements Action {

    readonly type = CharactersActionTypes.CHARACTERS_REQUESTED;

}

export class CharactersLoaded implements Action {

    readonly type = CharactersActionTypes.CHARACTERS_LOADED;

    constructor(public payload: { characters: Character[] }) {

    }
}

export type CharactersActions =
    CharactersRequested
    | CharactersLoaded;
