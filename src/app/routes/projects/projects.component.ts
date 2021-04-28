import {Component, OnInit} from '@angular/core';

import {GithubService} from '../../services/GithubService';
import {GitRepository} from '../../shared/github/GitRepository';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

    langFilters = new Set<string>();
    licenseFilters = new Set<string>();

    constructor(readonly githubService: GithubService) {
    }

    ngOnInit() {
    }

    colorizedLang(lang: string) {
        switch (lang.toLowerCase()) {
            case 'c':
                return 'black';
            case 'java':
                return 'chocolate';
            case 'python':
                return 'darkblue';
            case 'javascript':
                return 'gold';
            case 'typescript':
                return 'steelblue';
            case 'shell':
                return 'yellowgreen';
            default:
                return 'gray';
        }
    }

    addFilter(filter: 'lang' | 'license', value: string) {
        switch (filter) {
            case 'lang':
                this.langFilters.add(value);
                break;
            case 'license':
                this.licenseFilters.add(value);
                break;
            default:
                break;
        }
    }

    removeFilter(filter: 'lang' | 'license', value: string) {
        switch (filter) {
            case 'lang':
                this.langFilters.delete(value);
                break;
            case 'license':
                this.licenseFilters.delete(value);
                break;
            default:
                break;
        }
    }

    applyFilters(repository: GitRepository) {
        const isLangInFilter = this.langFilters.has(repository.language);
        const isLicenseInFilter = repository.license && this.licenseFilters.has(repository.license.key);

        return (this.langFilters.size === 0 || isLangInFilter) &&
            (this.licenseFilters.size === 0 || isLicenseInFilter);
    }

    isFiltersEmpty() {
        return this.langFilters.size === 0 && this.licenseFilters.size === 0;
    }

    resetFilters() {
        this.langFilters = new Set<string>();
        this.licenseFilters = new Set<string>();
    }
}
