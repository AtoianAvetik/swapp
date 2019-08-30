import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { State } from '../reducers';
import { CharactersService } from './_services/characters.service';
import {
    CharactersActionTypes,
    CharactersLoaded,
    CharactersRequested
} from './characters.actions';
import { charactersLoaded } from './characters.selectors';

@Injectable()
export class CharactersEffects {

    @Effect()
    loadAllCharacters$ = this.actions$
        .pipe(
            ofType<CharactersRequested>(CharactersActionTypes.CHARACTERS_REQUESTED),
            withLatestFrom(this.store.pipe(select(charactersLoaded))),
            filter(([action, isCharactersLoaded]) => !isCharactersLoaded),
            mergeMap(() => this.$charactersService.getAllCharacters()),
            map(characters => {
                // console.log(characters);
                return new CharactersLoaded({characters});
            })
        );

    constructor(private actions$: Actions, private $charactersService: CharactersService,
                private store: Store<State>) {
    }
}









