export class GitRepository {
    readonly id: string;
    readonly url: string;
    readonly svn_url: URL;
    readonly name: string;
    readonly isPrivate: boolean;
    readonly description: string;
    readonly createdDate: Date;
    readonly updatedDate: Date;
    readonly language: string;
    readonly fork: boolean;
    readonly origin: URL;
    readonly origin_name: string;
    readonly forksCount: bigint;
    readonly openIssuesCount: bigint;
    readonly license: string;
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
