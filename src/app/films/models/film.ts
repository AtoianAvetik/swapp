export class Film {
    id: string;
    title: string;
    url: string;

    constructor(data, id: string) {
        this.id = id;
        this.title = data.title;
        this.url = data.url;
    }
}

