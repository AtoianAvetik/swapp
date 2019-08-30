import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { State } from '../reducers';
import { FilmsService } from './_services/films.service';
import {
    FilmsActionTypes,
    FilmsLoaded,
    FilmsRequested
} from './films.actions';
import { filmsLoaded } from './films.selectors';

@Injectable()
export class FilmsEffects {

    @Effect()
    loadAllFilms$ = this.actions$
        .pipe(
            ofType<FilmsRequested>(FilmsActionTypes.FILMS_REQUESTED),
            withLatestFrom(this.store.pipe(select(filmsLoaded))),
            filter(([action, isFilmsLoaded]) => !isFilmsLoaded),
            mergeMap(() => this.$filmsService.getAllFilms()),
            map(films =>  new FilmsLoaded({films}))
        );

    constructor(private actions$: Actions, private $filmsService: FilmsService,
                private store: Store<State>) {
    }
}









