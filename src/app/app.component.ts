import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './reducers';
import { StarshipsRequested } from './starships/starships.actions';
import { FilmsRequested } from './films/films.actions';
import { SpeciesRequested } from './species/species.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'SWAPP';

    constructor(private store: Store<State>) {}

    ngOnInit(): void {
        this.store.dispatch(new StarshipsRequested());
        this.store.dispatch(new FilmsRequested());
        this.store.dispatch(new SpeciesRequested());
    }
}
