export class GitRepository {
    readonly id: String;
    readonly url: URL;
    readonly name: String;
    readonly isPrivate: boolean;
    readonly description: String;
    readonly createdDate: Date;
    readonly updatedDate: Date;
    readonly language: String;
    readonly forkedFrom: String;
    readonly forksCount: bigint;
    readonly openIssuesCount: bigint;
    readonly license: String;
    readonly watchers: bigint;

    constructor(private json) {
        this.id = json.id;
        this.url = json.svn_url;
        this.name = json.name;
        this.isPrivate = json.isPrivate;
        this.description = json.description;
        this.createdDate = json.createdDate;
        this.updatedDate = json.updatedDate;
        this.language = json.language;
        this.forkedFrom = json.forkedFrom;
        this.forksCount = json.forksCount;
        this.openIssuesCount = json.openIssuesCount;
        this.license = json.license != null ? json.license.name : null;
        this.watchers = json.watchers;
    }
}
