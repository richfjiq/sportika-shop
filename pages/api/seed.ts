import type { NextApiRequest, NextApiResponse } from 'next';
import { db, initialData } from '../../database';
import { Product } from '../../models';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connect();

  await Product.deleteMany();
  await Product.insertMany(initialData.initialData.products);

  await db.disconnect();

  res.status(200).json({ message: 'Data loaded :)' });
}
