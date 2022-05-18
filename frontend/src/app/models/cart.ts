import {IBase} from './base';
import {Item} from "./Item";

export interface ICart extends IBase{

  quantity: number;
  totalPrice:number;
  items:Item[];
}
