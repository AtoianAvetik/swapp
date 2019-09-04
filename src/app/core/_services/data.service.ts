import { Injectable } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { expand, last, map, scan } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';

import { ApiService } from './api.service';
import { FilmsRequested } from '../../films/films.actions';
import { SpeciesRequested } from '../../species/species.actions';
import { StarshipsRequested } from '../../starships/starships.actions';
import { CharactersRequested } from '../../characters/characters.actions';
import { starshipsLoaded } from '../../starships/starships.selectors';
import { filmsLoaded } from '../../films/films.selectors';
import { speciesLoaded } from '../../species/species.selectors';
import { AppDataLoaded, AppDataLoadingStarted } from '../../app.actions';
import { charactersLoaded } from '../../characters/characters.selectors';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private $apiService: ApiService,
                private store: Store<State>) {
    }

    requestAllData() {
        this.store.dispatch(new AppDataLoadingStarted());
        this.store.select(charactersLoaded).subscribe(res => {
            if ( !!res ) {
                this.store.dispatch(new AppDataLoaded());
            }
        });

        zip(
            this.store.select(starshipsLoaded),
            this.store.select(filmsLoaded),
            this.store.select(speciesLoaded),
        ).subscribe((res) => {
            if ( res.filter(v => !v).length < 1 ) { // check when all observables return true
                this.store.dispatch(new CharactersRequested());
            }
        });

        this.store.dispatch(new FilmsRequested());
        this.store.dispatch(new SpeciesRequested());
        this.store.dispatch(new StarshipsRequested());
    }

    fetchPaginatedData(path): Observable<any> {
        return this.$apiService.get(path)
            .pipe(
                expand(res => res['next']
                    ? this.$apiService.get(res['next'], true)
                    : of()),
                map(res => res['results']),
                scan((acc, res) => acc.concat(res), []),
                last()
            );
    }
}
