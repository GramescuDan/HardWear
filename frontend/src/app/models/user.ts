import {IBase} from './base';

export interface IUser extends IBase{

  email :string;
  password : string;
  first_name : string;
  last_name : string;
  phone : string;
  role: string;
  localdate: Date;
}
