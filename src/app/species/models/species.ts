export class Species {
    id: string;
    name: string;

    constructor(data, id: string) {
        this.id = id;
        this.name = data.name;
    }
}

