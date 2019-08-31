import { Action } from '@ngrx/store';
import { Character } from './models/character';

export enum CharactersActionTypes {
    CHARACTERS_REQUESTED = '[Characters page] All Characters Requested',
    CHARACTERS_LOADING_STARTED = '[Characters page] All Characters Loading Started',
    CHARACTERS_LOADED = '[Characters service] All Characters Loaded',
    CHARACTERS_FILTERED = '[Filter component] All Characters Filtered',
    CHARACTERS_PAGE_CHANGED = '[Characters page] Characters Page Changed',
}

export interface PageQuery {
    pageIndex: number;
    pageSize: number;
}

export class CharactersRequested implements Action {

    readonly type = CharactersActionTypes.CHARACTERS_REQUESTED;

}

export class CharactersLoadingStarted implements Action {

    readonly type = CharactersActionTypes.CHARACTERS_LOADING_STARTED;

}

export class CharactersLoaded implements Action {

    readonly type = CharactersActionTypes.CHARACTERS_LOADED;

    constructor(public payload: { characters: Character[] }) {

    }
}

export class CharactersFiltered implements Action {

    readonly type = CharactersActionTypes.CHARACTERS_FILTERED;

    constructor(public payload: { filter: any }) {

    }
}

export class CharactersPageChanged implements Action {

    readonly type = CharactersActionTypes.CHARACTERS_PAGE_CHANGED;

    constructor(public payload: { pageIndex: number }) {

    }
}

export type CharactersActions =
    CharactersRequested
    | CharactersLoadingStarted
    | CharactersLoaded
    | CharactersFiltered
    | CharactersPageChanged;
