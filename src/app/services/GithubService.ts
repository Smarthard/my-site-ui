import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GitRepository} from '../shared/github/GitRepository';
import {Observable, ReplaySubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GithubService {

    private repositoriesSubject = new ReplaySubject<GitRepository[]>(1);
    public readonly repositories$ = this.repositoriesSubject.asObservable();

    constructor(private http: HttpClient) {
        this.getMyRepos()
            .subscribe((res) => {
                const repositories = [];

                res
                    .filter((repository) => repository.fork)
                    .forEach(async (fork) => repositories.push(await this.getRepoInfo(fork)));

                res
                    .filter((repository) => !repository.fork)
                    .forEach((repository) => repositories.push(repository));

                this.repositoriesSubject.next(repositories);
            })
    }

    public getMyRepos(): Observable<GitRepository[]> {
        return this.http.get<GitRepository[]>('https://api.github.com/users/Smarthard/repos');
    }

    public getRepoInfo(repository: GitRepository): Promise<GitRepository> {
        return this.http.get<GitRepository>(repository.url).toPromise();
    }
}
