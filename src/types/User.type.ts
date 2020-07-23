export interface IUser {
    userId?: number;
    username: string;
    password: string;
    createOn: string;
    status?: boolean;
    admin: boolean;
}
