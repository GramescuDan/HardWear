import { IBase } from './base';
import { Item } from './Item';

export interface ICart extends IBase {
  cartItems: readonly Item[];
}
