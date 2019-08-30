import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../reducers';
import { CharactersRequested} from './characters.actions';
import { Character } from './models/character';
import { selectCharacters } from './characters.selectors';
import { selectStarships } from '../starships/starships.selectors';
import { selectFilms } from '../films/films.selectors';
import { selectSpecies } from '../species/species.selectors';

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
        this.store.dispatch(new CharactersRequested());
        this.characters$ = this.store.pipe(select(selectCharacters));
        // this.store.pipe(select(selectStarships)).subscribe(res => {
        //     console.log(res);
        // });
        // this.store.pipe(select(selectFilms)).subscribe(res => {
        //     console.log(res);
        // });
        // this.store.pipe(select(selectSpecies)).subscribe(res => {
        //     console.log(res);
        // });
    }
}
