import {IBase} from './base';
import {ICustomer} from "./customer";

export interface IShopItem extends IBase{
  customer: ICustomer;
  id:string;
  stock: number;
  price: number;
  nameItem: string;
  shortdescription: string;
  longdescription: string;
  photoUrl: string;
}
