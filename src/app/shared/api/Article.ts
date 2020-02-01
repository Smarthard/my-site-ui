export interface IArticle {
    readonly id: string,
    readonly name: string,
    readonly text: string,
    readonly createdAt: string
}

export class Article {

    constructor(
        public id: string,
        public name: string,
        public text: string,
        public createdAt: Date
    ) {}

}
