export interface User {
    id?: string;
    name?: string;
    password?: string;
    email: string;
    token?: string;
    isAdmin?: boolean;
}