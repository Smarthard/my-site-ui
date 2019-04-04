export class Article {
    readonly id: string;
    public name: string;
    public text: string;
    readonly createdAt: Date;

    private static parseTextFromBD(text: string): string {
        return text
                .split("\n").join("<BR>");
    }

    constructor(json) {
        this.id = json.id;
        this.name = json.name;
        this.text = Article.parseTextFromBD(json.text);
        this.createdAt = new Date(Date.parse(json.createdAt));
    }

}
