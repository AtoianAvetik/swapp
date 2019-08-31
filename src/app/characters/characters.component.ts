import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../reducers';
import { Character } from './models/character';
import { selectFilteredCharacters } from './characters.selectors';

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
        this.filteredCharacters$ = this.store.pipe(select(selectFilteredCharacters));
    }
}
