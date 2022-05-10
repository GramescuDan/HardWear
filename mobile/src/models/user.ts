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
    location: string;
    roles: Role[];
    enabled: boolean;
}