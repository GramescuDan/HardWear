import { IBase } from './base';
import { Item } from "./Item";
import { ICart } from "./cart";

export class IUser implements IBase {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  location: string;
  favouriteItems: Item[];
  cart: ICart;
}
