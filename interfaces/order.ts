import { IUser, ISize } from './';

export interface IOrder {
  _id?: string;
  user?: string | IUser;
  orderItems: IOrderItem[];
  shippingAddress: ShippingAddress;
  paymentResult?: string;
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  isPaid: boolean;
  paidAt?: string;
  transactionId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IOrderItem {
  _id: string;
  title: string;
  size: ISize;
  quantity: number;
  slug: string;
  image: string;
  price: number;
  gender: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  code: string;
  phone: string;
}

// export interface IOrder {
//   _id?: string;
//   user?: IUser | string;
//   orderItems: IOrderItem[];
//   shippingAddress: ShippingAddress;
//   paymentResult?: string;
//   numberOfItems: number;
//   subTotal: number;
//   tax: number;
//   total: number;
//   isPaid: boolean;
//   paidAt?: string;
// }

// export interface IOrderItem {
//   _id: string;
//   image: string;
//   price: number;
//   size: ISize;
//   slug: string;
//   title: string;
//   gender: 'men' | 'women' | 'boys' | 'girls';
//   quantity: number;
// }

// export interface ShippingAddress {
//   firstName: string;
//   lastName: string;
//   address: string;
//   address2?: string;
//   zip: string;
//   city: string;
//   country: string;
//   code: string;
//   phone: string;
// }
