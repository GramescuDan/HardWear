import {IBase} from './base';

export class IUser implements IBase{

  username: string;
  email :string;
  password : string;
  first_name : string;
  last_name : string;
  phone : string;
  role: string;
  adress: string;
  id: number;
}
