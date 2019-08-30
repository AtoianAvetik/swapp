import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../reducers';
import { CharactersRequested} from './characters.actions';
import { Character } from './models/character';
import { selectCharacters } from './characters.selectors';

@Component({
    selector: 'app-characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
    characters$: Observable<Character[]>;

    constructor(private store: Store<State>) {
    }

    ngOnInit() {
        console.log(1);
        this.store.dispatch(new CharactersRequested());
        this.characters$ = this.store.pipe(select(selectCharacters));
    }
}
