import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data =
  | {
      message: string;
    }
  | IProduct[]
  | IProduct;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    case 'PUT':
      return updateProduct(req, res);
    case 'POST':
      return createProduct(req, res);
    default:
      return res.status(400).json({ message: 'Bad request.' });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await Product.find().sort({ title: 'asc' }).lean();
  await db.disconnect();

  // TODO: update images

  res.status(200).json(products);
};

const updateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id = '', images = [] } = req.body as IProduct;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: 'Product id is not valid.' });
  }

  if (images.length < 2) {
    return res.status(400).json({ message: 'At least 2 images are required.' });
  }

  // TODO:
  try {
    await db.connect();

    const product = await Product.findById(_id);

    if (!product) {
      await db.disconnect();

      return res
        .status(400)
        .json({ message: 'There is no product with this id.' });
    }

    // TODO: delete images in Cloudinary

    await product.update(req.body);

    await db.disconnect();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: 'Check the server logs.' });
  }
};

const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { images = [] } = req.body as IProduct;

  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: 'Product needs at least 2 images.' });
  }

  try {
    await db.connect();

    const productInDb = await Product.findOne({ slug: req.body.slug });

    if (productInDb) {
      await db.disconnect();
      return res.status(400).json({ message: 'Product already exists.' });
    }

    const product = new Product(req.body);
    await product.save();
    await db.disconnect();

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: 'Check server logs.' });
  }
};
