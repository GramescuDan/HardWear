import {IBase} from './base';
import {Item} from "./Item";

export class IUser implements IBase{
  id: number;
  email :string;
  password : string;
  firstName : string;
  lastName : string;
  username: string;
  phone : string;
  location: string;
  favouriteItems: Item[];

}
