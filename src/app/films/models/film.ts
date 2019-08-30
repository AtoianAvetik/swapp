export class Film {
    id: string;
    title: string;

    constructor(data, id: string) {
        this.id = id;
        this.title = data.title;
    }
}

