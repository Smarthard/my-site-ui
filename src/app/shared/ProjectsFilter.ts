export class ProjectsFilter {
    readonly lang: string;
    readonly pl: string;

    constructor(private filters: {lang?: string, pl?: string}) {
        this.lang = filters.lang;
        this.pl = filters.pl;
    }
}
