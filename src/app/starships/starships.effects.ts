import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { State } from '../reducers';
import {
    StarshipsActionTypes,
    StarshipsLoaded,
    StarshipsRequested
} from './starships.actions';
import { starshipsLoaded } from './starships.selectors';
import { DataService } from '../core/_services/data.service';
import { Starship } from './models/starship';

@Injectable()
export class StarshipsEffects {

    @Effect()
    loadAllStarships$ = this.actions$
        .pipe(
            ofType<StarshipsRequested>(StarshipsActionTypes.STARSHIPS_REQUESTED),
            withLatestFrom(this.store.pipe(select(starshipsLoaded))),
            filter(([action, isStarshipsLoaded]) => !isStarshipsLoaded),
            mergeMap(() => this.$dataService.fetchPaginatedData('starships/')),
            map(starships => new StarshipsLoaded({
                starships: starships.map((v, i) => new Starship(v, i.toString()))
            }))
        );

    constructor(private actions$: Actions,
                private $dataService: DataService,
                private store: Store<State>) {
    }
}









