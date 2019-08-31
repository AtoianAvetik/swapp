import { select, Store } from '@ngrx/store';
import { selectStarships } from '../../starships/starships.selectors';
import { State } from '../../reducers';
import { selectSpecies } from '../../species/species.selectors';
import { selectFilms } from '../../films/films.selectors';

export class Character {
    id: string;
    name: string;
    films: string[];
    species: string[];
    starships: string[];
    birthYear: string;

    constructor(data, id: string, store: Store<State>) {
        this.id = id;
        this.name = data.name;
        this.films = data.films;
        this.species = data.species;
        this.starships = data.starships;
        this.birthYear = data.birth_year;

        store.pipe(select(selectFilms)).subscribe(res => {
            this.films = this.films.map(f => res.find(v => v.url === f).title);
        });

        store.pipe(select(selectSpecies)).subscribe(res => {
            this.species = this.species.map(f => res.find(v => v.url === f).name);
        });

        store.pipe(select(selectStarships)).subscribe(res => {
            this.starships = this.starships.map(f => res.find(v => v.url === f).name);
        });
    }
}

