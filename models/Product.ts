import mongoose, { model, Model, Schema } from 'mongoose';
import { IProduct } from '../interfaces';

const ProductSchema = new Schema<IProduct>(
  {
    description: { type: String, required: true, default: '' },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [
      {
        type: String,
        enum: {
          values: [
            'XS',
            'S',
            'M',
            'L',
            'XL',
            '2 years',
            '3 years',
            '4 years',
            '5 years',
            '5-6 years',
            '7-8 years',
            '9-10 years',
            '11-12 years',
            '13-14 years',
            '15-16 years',
            '5',
            '5.5',
            '6',
            '6.5',
            '7',
            '7.5',
            '8',
            '8.5',
            '9',
            '9.5',
            '10',
            '10.5',
            '11',
            '11.5',
            '12',
            '12.5',
            '13',
            '13.5',
            '14',
            '1k',
            '2k',
            '3k',
            '4k',
            '5k',
            '5.5k',
            '6k',
            '6.5k',
            '7k',
            '7.5k',
            '8k',
            '8.5k',
            '9k',
            '9.5k',
            '10k',
            '10.5k',
            '11k',
            '11.5k',
            '12k',
            '12.5k',
            '13k',
            '13.5k',
            '1',
            '1.5',
            '2',
            '2.5',
            '3',
            '3.5',
            '4',
            '4.5',
          ],
          message: '{VALUE} is not a valid size',
        },
      },
    ],
    slug: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: {
        values: ['clothing', 'shoes'],
        message: '{VALUE} is not a valid type',
      },
      default: 'clothing',
    },
    tags: [{ type: String }],
    title: { type: String, required: true, default: '' },
    gender: {
      type: String,
      enum: {
        values: ['men', 'women', 'girls', 'boys'],
        message: '{VALUE} is not a valid gender',
      },
      default: 'men',
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({ title: 'text', tags: 'text' });

const Product: Model<IProduct> =
  mongoose.models.Product || model('Product', ProductSchema);

export default Product;
