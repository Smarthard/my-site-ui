export class User {
    public name: string;
    public login: string;
    public email: string;
    public banned: boolean;
    public role: string;
    public registered: Date;

    constructor(raw) {
        this.name = raw.name;
        this.login = raw.login;
        this.email = raw.email;
        this.banned = raw.banned;
        this.role = raw.role;
        this.registered = raw.createdAt;
    }
}
