import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {GitRepository} from "../shared/github/GitRepository";
import {ProjectsFilter} from "../shared/github/ProjectsFilter";

@Injectable({
    providedIn: "root"
})
export class GithubService {

    private static repositories: GitRepository[] = [];

    constructor(private http: HttpClient) {}

    public getMyRepos(): Promise<GitRepository[]> {
        return new Promise<GitRepository[]>((resolve, reject) => {
            if (GithubService.repositories.length == 0) {
                this.http.get('https://api.github.com/users/Smarthard/repos').subscribe(
                (res) => {
                    for (let obj in res) {
                        let repo: GitRepository = new GitRepository(res[obj]);

                        if (repo.fork) {
                            this.getRepoInfo(repo.url).then(
                                res => {
                                    GithubService.repositories.push(res);
                                },
                                err => {
                                    console.error(err);
                                });
                        } else {
                            GithubService.repositories.push(repo);
                        }
                    }

                    resolve(GithubService.repositories);
                },
                (err) => {
                    console.error(err);
                    reject(err);
                });
            } else {
                resolve(GithubService.repositories);
            }
        });
    }

    public getFilteredRepos(filters: ProjectsFilter): Promise<GitRepository[]> {
        return new Promise<GitRepository[]>((resolve) => {
            let fRepos: GitRepository[] = [];

            this.getMyRepos().then(res => {
                fRepos = res;

                if (filters.lang) {
                    fRepos = fRepos.filter(value => {
                        return filters.lang.includes(value.language);
                    });
                }

                if (filters.pl) {
                    fRepos = fRepos.filter(value => {
                        return filters.pl.includes(value.license);
                    });
                }
            }).catch(reason => {
                console.error(reason);
            }).finally(() => {
                resolve(fRepos);
            });
        });
    }

    private getRepoInfo(repo: string): Promise<GitRepository> {
        return new Promise<GitRepository>((resolve, reject) => {
            this.http.get(repo).subscribe(
            res => {
                resolve(new GitRepository(res));
            },
            err => {
                reject(err);
            });
        });
    }
}
