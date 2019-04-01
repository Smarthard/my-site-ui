export class ProjectsFilter {
    public lang: string;
    public pl: string;

    constructor(private filters: {lang?: string, pl?: string}) {
        this.lang = filters.lang;
        this.pl = filters.pl;
    }
}
