import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { State } from '../reducers';
import {
    SpeciesActionTypes,
    SpeciesLoaded,
    SpeciesRequested
} from './species.actions';
import { speciesLoaded } from './species.selectors';
import { DataService } from '../core/_services/data.service';
import { Species } from './models/species';

@Injectable()
export class SpeciesEffects {

    @Effect()
    loadAllSpecies$ = this.actions$
        .pipe(
            ofType<SpeciesRequested>(SpeciesActionTypes.SPECIES_REQUESTED),
            withLatestFrom(this.store.pipe(select(speciesLoaded))),
            filter(([action, isSpeciesLoaded]) => !isSpeciesLoaded),
            mergeMap(() => this.$dataService.fetchPaginatedData('species/')),
            map(species => new SpeciesLoaded({
                species: species.map((v, i) => new Species(v, i.toString()))
            }))
        );

    constructor(private actions$: Actions,
                private $dataService: DataService,
                private store: Store<State>) {
    }
}









