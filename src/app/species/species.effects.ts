import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { State } from '../reducers';
import { SpeciesService } from './_services/species.service';
import {
    SpeciesActionTypes,
    SpeciesLoaded,
    SpeciesRequested
} from './species.actions';
import { speciesLoaded } from './species.selectors';

@Injectable()
export class SpeciesEffects {

    @Effect()
    loadAllSpecies$ = this.actions$
        .pipe(
            ofType<SpeciesRequested>(SpeciesActionTypes.SPECIES_REQUESTED),
            withLatestFrom(this.store.pipe(select(speciesLoaded))),
            filter(([action, isSpeciesLoaded]) => !isSpeciesLoaded),
            mergeMap(() => this.$speciesService.getAllSpecies()),
            map(species => new SpeciesLoaded({species}))
        );

    constructor(private actions$: Actions, private $speciesService: SpeciesService,
                private store: Store<State>) {
    }
}









