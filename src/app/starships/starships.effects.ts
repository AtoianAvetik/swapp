import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { State } from '../reducers';
import { StarshipsService } from './_services/starships.service';
import {
    StarshipsActionTypes,
    StarshipsLoaded,
    StarshipsRequested
} from './starships.actions';
import { starshipsLoaded } from './starships.selectors';

@Injectable()
export class StarshipsEffects {

    @Effect()
    loadAllStarships$ = this.actions$
        .pipe(
            ofType<StarshipsRequested>(StarshipsActionTypes.STARSHIPS_REQUESTED),
            withLatestFrom(this.store.pipe(select(starshipsLoaded))),
            filter(([action, isStarshipsLoaded]) => !isStarshipsLoaded),
            mergeMap(() => this.$starshipsService.getAllStarships()),
            map(starships => new StarshipsLoaded({starships}))
        );

    constructor(private actions$: Actions, private $starshipsService: StarshipsService,
                private store: Store<State>) {
    }
}









