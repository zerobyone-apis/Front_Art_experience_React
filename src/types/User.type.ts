export interface IUser {
    username: string;
    fullName: string;
    email: string;
    password: string;
    password2?: string;
    cel: string;
    createOn: string;
    admin: boolean;
    userId: number;
    barberId: number;
    status: boolean;
}
