import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GitRepository} from '../shared/github/GitRepository';

@Injectable({
    providedIn: 'root'
})
export class GithubService {

    private static repositories: GitRepository[] = [];

    constructor(private http: HttpClient) {}

    public getMyRepos(): Promise<GitRepository[]> {
        return new Promise<GitRepository[]>((resolve, reject) => {
            if (GithubService.repositories.length === 0) {
                this.http.get('https://api.github.com/users/Smarthard/repos').subscribe(
                (res: object[]) => {
                    res.forEach((element, index) =>  {
                        const repo: GitRepository = new GitRepository(element);
                        GithubService.repositories.push(repo);

                        if (repo.fork) {
                            this.getRepoInfo(repo.url).then(
                                fork => {
                                    GithubService.repositories[index] = fork;
                                },
                                err => {
                                    console.error(err);
                                });
                        }
                    });

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
