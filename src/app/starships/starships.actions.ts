import { Action } from '@ngrx/store';
import { Starship } from './models/starship';

export enum StarshipsActionTypes {
    STARSHIPS_REQUESTED = '[Starships page] All Starships Requested',
    STARSHIPS_LOADED = '[Starships service] All Starships Loaded',
}

export class StarshipsRequested implements Action {

    readonly type = StarshipsActionTypes.STARSHIPS_REQUESTED;

}

export class StarshipsLoaded implements Action {

    readonly type = StarshipsActionTypes.STARSHIPS_LOADED;

    constructor(public payload: { starships: Starship[] }) {

    }
}

export type StarshipsActions =
    StarshipsRequested
    | StarshipsLoaded;
