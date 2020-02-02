export class GitRepository {
    constructor(
        public id: string,
        public url: string,
        public svn_url: URL | string,
        public name: string,
        public isPrivate: boolean,
        public description: string,
        public createdDate: Date | string,
        public updatedDate: Date | string,
        public language: string,
        public fork: boolean,
        public forksCount: number,
        public openIssuesCount: number,
        public license: {
            key: string,
            name: string,
            spdx_id: string,
            url: URL | string,
            node_id: string
        },
        public watchers: number,
        public parent?: GitRepository,
    ) {}
}
