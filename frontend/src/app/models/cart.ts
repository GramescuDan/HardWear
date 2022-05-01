import {IBase} from './base';
import {IShopItem} from "./shopitem";

export interface ICart extends IBase{

  quantity: number;
  totalPrice:number;
  items:IShopItem[];
}
