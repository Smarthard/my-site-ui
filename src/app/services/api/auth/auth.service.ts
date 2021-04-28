import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';

import {IUser, User} from '../../../shared/api/User';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private user: User = null;
    private userChecked = false;

    constructor(
        private http: HttpClient,
        private cookie: CookieService
    ) {}

    public isAuthorized(): boolean {
        return this.getUser() != null;
    }

    public getUser() {
        if (!this.user && !this.userChecked) {
            try {
                this.userChecked = true;
                this.user = JSON.parse(this.cookie.get('user'));
            } catch (e) {
                console.warn('Could not find user\'s cookies');
                this.whoami()
                    .subscribe((res) => {
                            this.setUser(res);
                        },
                        () => {
                            this.destroyUser();
                        });
            }
        }

        return this.user;
    }

    public whoami(): Observable<User> {
        return this.http.get<IUser>(`${environment.apiSecureUrl}/auth/me`, {withCredentials: true})
            .pipe(
                map(user => new User(
                    user.id,
                    user.name,
                    user.login,
                    user.email,
                    user.banned,
                    user.scopes,
                    new Date(user.createdAt)
                    )
                )
            );
    }

    public login(login: string, password: string) {
        this.http.post<IUser>(`${environment.apiSecureUrl}/auth/login`, {login, password})
            .subscribe((user) => {
                    try {
                        this.setUser(
                            new User(
                                user.id,
                                user.name,
                                user.login,
                                user.email,
                                user.banned,
                                user.scopes,
                                new Date(user.createdAt)
                            )
                        );
                    } catch (e) {
                        this.destroyUser();
                        console.error('Failed to log in');
                    }
                },
                (err) => console.error(err)
            );
    }

    public logout() {
        this.http.get<{ message: string }>(`${environment.apiSecureUrl}/auth/logout`, {withCredentials: true})
            .subscribe((value) => {
                    console.log(value.message);
                    this.destroyUser();
                },
                error => {
                    console.error(error);
                });
    }

    private setUser(user: User) {
        try {
            this.user = user;
            this.cookie.set('user', JSON.stringify(user));
        } catch (e) {
            console.error(e);
        }
    }

    private destroyUser() {
        this.cookie.delete('user');
        this.user = null;
    }
}
