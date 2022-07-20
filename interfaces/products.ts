export interface IProduct {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ISize[];
  slug: string;
  type: IType;
  tags: string[];
  title: string;
  gender: 'men' | 'women' | 'boys' | 'girls';

  // TODO: agregar createdAt y updatedAt
  createdAt: string;
  updatedAt: string;
}

type ClothesAdultsSizes = 'XS' | 'S' | 'M' | 'L' | 'XL';
type ClothesBoysSizes =
  | '2 years'
  | '3 years'
  | '4 years'
  | '5 years'
  | '5-6 years'
  | '7-8 years'
  | '9-10 years'
  | '11-12 years'
  | '13-14 years'
  | '15-16 years';
type ShoesAdultsSizes =
  | '5'
  | '5.5'
  | '6'
  | '6.5'
  | '7'
  | '7.5'
  | '8'
  | '8.5'
  | '9'
  | '9.5'
  | '10'
  | '10.5'
  | '11'
  | '11.5'
  | '12'
  | '12.5'
  | '13'
  | '13.5'
  | '14';
type ShoesKidsSizes =
  | '1k'
  | '2k'
  | '3k'
  | '4k'
  | '5k'
  | '5.5k'
  | '6k'
  | '6.5k'
  | '7k'
  | '7.5k'
  | '8k'
  | '8.5k'
  | '9k'
  | '9.5k'
  | '10k'
  | '10.5k'
  | '11k'
  | '11.5k'
  | '12k'
  | '12.5k'
  | '13k'
  | '13.5k'
  | '1'
  | '1.5'
  | '2'
  | '2.5'
  | '3'
  | '3.5'
  | '4'
  | '4.5';

export type ISize =
  | ClothesBoysSizes
  | ClothesAdultsSizes
  | ShoesAdultsSizes
  | ShoesKidsSizes;

export type IType = 'shoes' | 'clothing';
