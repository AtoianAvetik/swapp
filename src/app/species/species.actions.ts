import { Action } from '@ngrx/store';
import { Species } from './models/species';

export enum SpeciesActionTypes {
    SPECIES_REQUESTED = '[Species page] All Species Requested',
    SPECIES_LOADED = '[Species service] All Species Loaded',
}

export class SpeciesRequested implements Action {

    readonly type = SpeciesActionTypes.SPECIES_REQUESTED;

}

export class SpeciesLoaded implements Action {

    readonly type = SpeciesActionTypes.SPECIES_LOADED;

    constructor(public payload: { species: Species[] }) {

    }
}

export type SpeciesActions =
    SpeciesRequested
    | SpeciesLoaded;
