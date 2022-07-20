import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data =
  | {
      message: string;
    }
  | IProduct;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log({ req });
  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res);
    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}

const getProductBySlug = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { slug } = req.query;
  await db.connect();

  const product = await Product.findOne({ slug })
    .select('gender title images price slug inStock -_id')
    .lean();

  await db.disconnect();

  if (!product) {
    return res.status(404).json({
      message: 'Product not found.',
    });
  }

  res.status(200).json(product);
};
