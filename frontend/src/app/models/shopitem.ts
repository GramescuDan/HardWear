import {IBase} from './base';
import {IUser} from "./user";

export interface IShopItem extends IBase{
  user: IUser;
  stock: number;
  price: number;
  nameItem: string;
  shortdescription: string;
  longdescription: string;
  photoUrl: string;
}
