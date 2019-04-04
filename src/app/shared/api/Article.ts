export class Article {
    readonly id: string;
    public name: string;
    public text: string;
    readonly createdAt: Date;

    constructor(json) {
        this.id = json.id;
        this.name = json.name;
        this.text = json.text;
        this.createdAt = new Date(Date.parse(json.createdAt));
    }

}
