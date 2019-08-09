import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../shared/api/User";
import {environment} from "../../../environments/environment";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static readonly API: string = environment.apiSecureUrl;

  // expires, path, secure, sameSite
  static readonly cookieConfig: Array<any> = [null, '/', environment.domain, environment.production, 'Strict'];

  private user: User = null;
  private user_checked: boolean = false;

  constructor(private http: HttpClient, private cookie: CookieService) {}

  public isAuthorized(): boolean {
    return this.getUser() != null;
  }

  public getUser() {
    if (!this.user && !this.user_checked) {
        try {
            this.user_checked = true;
            this.user = JSON.parse(this.cookie.get('user'));
        } catch (e) {
            console.error("Could not find user's cookies");
        }

        this.http.get(AuthService.API + '/auth/me', { withCredentials: true})
            .subscribe((res) => {
                this.setUser(res);
            },
            err => {
                this.destroyUser();
            });
    }

    return this.user;
  }

  public login(login: string, password: string) {
    this.http.post(AuthService.API + '/auth/login',
        { login: login,  password: password },
        { withCredentials: true })
        .subscribe((res) => {
            try {
                this.setUser(res);
            } catch (e) {
                this.destroyUser();
                console.error('Failed to log in');
            }
        },
        err => {
          console.error(err);
        });
  }

  public logout() {
    this.http.get(AuthService.API + '/auth/logout', { withCredentials: true })
        .subscribe((value: any) => {
            console.log(value.message);
            this.destroyUser();
        },
        error => {
            console.error(error);
        });
  }

  private setUser(json) {
      this.user = new User(json);
      this.cookie.set('user', JSON.stringify(json), ...AuthService.cookieConfig);
  }

  private destroyUser() {
      this.cookie.delete('user');
      this.user = null;
  }
}
