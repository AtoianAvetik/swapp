export class Character {
    id: string;
    name: string;
    films: [string];
    species: [string];
    starships: [string];

    constructor(data, id: string) {
        this.id = id;
        this.name = data.name;
        this.films = data.films;
        this.species = data.species;
        this.starships = data.starships;
    }
}

