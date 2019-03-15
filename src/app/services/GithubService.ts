import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class GithubService {

    constructor(private http: HttpClient) {}

    public getMyRepos() {
        return this.http.get('https://api.github.com/users/Smarthard/repos');
    }
}
