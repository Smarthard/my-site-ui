export class GitRepository {
    readonly id: String;
    readonly url: string;
    readonly svn_url: URL;
    readonly name: string;
    readonly isPrivate: boolean;
    readonly description: String;
    readonly createdDate: Date;
    readonly updatedDate: Date;
    readonly language: String;
    readonly fork: boolean;
    readonly origin: URL;
    readonly origin_name: String;
    readonly forksCount: bigint;
    readonly openIssuesCount: bigint;
    readonly license: String;
    readonly watchers: bigint;

    constructor(private json) {
        this.id = json.id;
        this.url = json.url;
        this.svn_url = json.svn_url;
        this.name = json.name;
        this.isPrivate = json.isPrivate;
        this.description = json.description;
        this.createdDate = json.createdDate;
        this.updatedDate = json.updatedDate;
        this.language = json.language;
        this.fork = json.fork;
        this.origin = json.source != undefined ? json.source.html_url : null;
        this.origin_name = this.origin != null && String(this.origin) != null ?
                                            String(this.origin).substring(String(this.origin).indexOf("com/") + 4)
                                            : null;
        this.forksCount = json.forksCount;
        this.openIssuesCount = json.openIssuesCount;
        this.license = json.license != null ? json.license.name : null;
        this.watchers = json.watchers;
    }
}
