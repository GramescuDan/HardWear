import { Item } from "../screens/home/product-list-screen";

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
    favouriteItems: Item[];
    cart: {
        id: number,
        cartItems: Item[]
    }
}
