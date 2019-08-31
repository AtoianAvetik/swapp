import { select, Store } from '@ngrx/store';
import { selectStarships } from '../../starships/starships.selectors';
import { State } from '../../reducers';
import { selectSpecies } from '../../species/species.selectors';
import { selectFilms } from '../../films/films.selectors';

export class Character {
    id: string;
    name: string;
    films: {}[];
    species: {}[];
    starships: {}[];
    birthYear: string;

    constructor(data, id: string, store: Store<State>) {
        this.id = id;
        this.name = data.name;
        this.films = data.films;
        this.species = data.species;
        this.starships = data.starships;
        this.birthYear = data.birth_year;

        store.pipe(select(selectFilms)).subscribe(res => {
            this.films = this.films.map(f => Character.filterObject(res.find(v => v.url === f), ['id', 'title']));
        });

        store.pipe(select(selectSpecies)).subscribe(res => {
            this.species = this.species.map(f => Character.filterObject(res.find(v => v.url === f), ['id', 'name']));
        });

        store.pipe(select(selectStarships)).subscribe(res => {
            this.starships = this.starships.map(f => Character.filterObject(res.find(v => v.url === f), ['id', 'name']));
        });
    }

    static filterObject(obj, keys) {
        return Object.keys(obj)
            .filter( key => keys.indexOf(key) !== -1)
            .reduce( (acc, key) => (acc[key] = obj[key], acc), {} );
    }
}

