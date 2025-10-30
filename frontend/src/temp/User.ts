export type User = {
    firstname: string;
    lastname: string;
    password: string;
    type: string;
    city: string;
    state: string;
    title?: string;
    level?: string;
};

export type LoginInfo = {
