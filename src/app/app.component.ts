import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgtLoaderService } from 'ng-tools';
import { select, Store } from '@ngrx/store';
import { State } from './reducers';
import { charactersLoading } from './characters/characters.selectors';
import { FilmsRequested } from './films/films.actions';
import { SpeciesRequested } from './species/species.actions';
import { StarshipsRequested } from './starships/starships.actions';
import { CharactersRequested } from './characters/characters.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'SWAPP';
    loader;

    constructor(private $loaderService: NgtLoaderService,
                private store: Store<State>) {
    }

    ngOnInit(): void {
        this.store.dispatch(new FilmsRequested());
        this.store.dispatch(new SpeciesRequested());
        this.store.dispatch(new StarshipsRequested());
        this.store.dispatch(new CharactersRequested());
    }

    ngAfterViewInit(): void {
        this.loader = this.$loaderService.create({
            id: 'appLoader'
        });

        this.store.pipe(select(charactersLoading))
            .subscribe(res => {
                res ? this.loader.present() : this.loader.dismiss();
            });
    }
}
