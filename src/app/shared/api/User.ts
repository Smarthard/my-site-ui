export interface IUser {
    readonly id: number;
    readonly name: string;
    readonly login: string;
    readonly email: string;
    readonly banned: boolean;
    readonly scopes: string[];
    readonly createdAt: string;
}

export class User {
    constructor(
        public id: number,
        public name: string,
        public login: string,
        public email: string,
        public banned: boolean,
        public roles: string[],
        public registered: Date
    ) {}
}
