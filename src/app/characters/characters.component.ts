import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../reducers';
import { CharactersRequested } from './characters.actions';
import { Character } from './models/character';
import { selectFilteredCharacters } from './characters.selectors';
import { StarshipsRequested } from '../starships/starships.actions';
import { FilmsRequested } from '../films/films.actions';
import { SpeciesRequested } from '../species/species.actions';

@Component({
    selector: 'app-characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
    filteredCharacters$: Observable<Character[]>;

    constructor(private store: Store<State>) {
    }

    ngOnInit() {
        this.store.dispatch(new FilmsRequested());
        this.store.dispatch(new SpeciesRequested());
        this.store.dispatch(new StarshipsRequested());
        this.store.dispatch(new CharactersRequested());
        this.filteredCharacters$ = this.store.pipe(select(selectFilteredCharacters));
    }
}
