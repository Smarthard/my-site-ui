import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {GitRepository} from "../shared/GitRepository";

@Injectable()
export class GithubService {

    private repositories: GitRepository[] = [];

    constructor(private http: HttpClient) {}

    public getMyRepos(): Promise<GitRepository[]> {
        return new Promise<GitRepository[]>((resolve, reject) => {
            this.http.get('https://api.github.com/users/Smarthard/repos').subscribe(
                (res) => {
                    for (let obj in res) {
                        let repo: GitRepository = new GitRepository(res[obj]);

                        if (repo.fork) {
                            this.getRepoInfo(repo.url).subscribe(
                                res => {
                                    repo = new GitRepository(res);
                                    this.repositories.push(repo);
                                },
                                err => {
                                    console.error(err);
                                })
                        } else {
                            this.repositories.push(repo);
                        }
                    }

                    resolve(this.repositories);
                },
                (err) => {
                    console.error(err);
                    reject(err);
                }
            )
        });
    }

    private getRepoInfo(fork: string) {
        return this.http.get(fork);
    }
}
