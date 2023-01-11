import { IUser } from './user';

export interface IAddress {
  _id?: string;
  user?: string | IUser;
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  state?: string;
  country: string;
  code: string;
  phone: string;
}
