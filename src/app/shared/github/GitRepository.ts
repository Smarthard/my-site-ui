export class GitRepository {
    constructor(
        public id: string,
        public url: string,
        public svn_url: URL | string,
        public name: string,
        public full_name: string,
        public description: string,
        public createdDate: Date | string,
        public updatedDate: Date | string,
        public language: string,
        public fork: boolean,
        public openIssuesCount: number,
        public license: {
            key: string,
            name: string,
            spdx_id: string,
            url: URL | string,
            node_id: string
        },
        public forks_count: number = 0,
        public stargazers_count: number = 0,
        public watchers_count: number = 0,
        public parent?: GitRepository,
    ) {}
}
