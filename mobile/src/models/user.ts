interface Role {
    id: number;
    name: string;
}

export interface User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    phone: string;
    date: string;
    roles: Role[];
    enabled: boolean;
}