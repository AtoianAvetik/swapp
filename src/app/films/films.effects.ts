import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { State } from '../reducers';
import {
    FilmsActionTypes,
    FilmsLoaded,
    FilmsRequested
} from './films.actions';
import { filmsLoaded } from './films.selectors';
import { DataService } from '../core/_services/data.service';
import { Film } from './models/film';

@Injectable()
export class FilmsEffects {

    @Effect()
    loadAllFilms$ = this.actions$
        .pipe(
            ofType<FilmsRequested>(FilmsActionTypes.FILMS_REQUESTED),
            withLatestFrom(this.store.pipe(select(filmsLoaded))),
            filter(([action, isFilmsLoaded]) => !isFilmsLoaded),
            mergeMap(() => this.$dataService.fetchPaginatedData('films/')),
            map(films => new FilmsLoaded({
                films: films.map((v, i) => new Film(v, i.toString()))
            }))
        );

    constructor(private actions$: Actions,
                private $dataService: DataService,
                private store: Store<State>) {
    }
}









