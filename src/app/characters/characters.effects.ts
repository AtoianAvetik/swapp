import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { State } from '../reducers';
import {
    CharactersActionTypes,
    CharactersLoaded, CharactersLoadingStarted,
    CharactersRequested
} from './characters.actions';
import { charactersLoaded } from './characters.selectors';
import { DataService } from '../core/_services/data.service';
import { Character } from './models/character';

@Injectable()
export class CharactersEffects {

    @Effect()
    loadAllCharacters$ = this.actions$
        .pipe(
            ofType<CharactersRequested>(CharactersActionTypes.CHARACTERS_REQUESTED),
            withLatestFrom(this.store.pipe(select(charactersLoaded))),
            filter(([action, isCharactersLoaded]) => {
                if (!isCharactersLoaded) {
                    this.store.dispatch(new CharactersLoadingStarted());
                }
                return !isCharactersLoaded;
            }),
            mergeMap(() => this.$dataService.fetchPaginatedData('people/')),
            map(characters => new CharactersLoaded({
                characters: characters.map((v, i) => new Character(v, i.toString(), this.store))
            }))
        );

    constructor(private actions$: Actions,
                private $dataService: DataService,
                private store: Store<State>) {
    }
}









