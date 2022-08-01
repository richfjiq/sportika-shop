import { ISize, IType } from './products';

export interface FormProduct {
  _id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ISize[];
  slug: string;
  tags: string[];
  title: string;
  type: IType;
  gender: 'men' | 'women' | 'boys' | 'girls';
}
