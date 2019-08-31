export class Starship {
    id: string;
    name: string;
    url: string;

    constructor(data, id: string) {
        this.id = id;
        this.name = data.name;
        this.url = data.url;
    }
}

