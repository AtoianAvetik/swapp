import { Action } from '@ngrx/store';
import { Film } from './models/film';

export enum FilmsActionTypes {
    FILMS_REQUESTED = '[Films page] All Films Requested',
    FILMS_LOADED = '[Films service] All Films Loaded',
}

export class FilmsRequested implements Action {

    readonly type = FilmsActionTypes.FILMS_REQUESTED;

}

export class FilmsLoaded implements Action {

    readonly type = FilmsActionTypes.FILMS_LOADED;

    constructor(public payload: { films: Film[] }) {

    }
}

export type FilmsActions =
    FilmsRequested
    | FilmsLoaded;
