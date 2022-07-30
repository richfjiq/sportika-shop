import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { Order, Product, User } from '../../../models';

type Data =
  | {
      numberOfOrders: number;
      paidOrders: number;
      notPaidOrders: number;
      numberOfClients: number;
      numberOfProducts: number;
      productsWithNoInventory: number;
      lowInventory: number;
    }
  | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session: any = await getSession({ req });

  if (!session) {
    return res.status(404).json({ message: 'Unauthorized' });
  }

  if (session.user.role === 'client') {
    return res.status(404).json({ message: 'Unauthorized' });
  }

  await db.connect();
  // const numberOfOrders = await Order.find().count();
  // const paidOrders = await Order.find({ isPaid: { $eq: true } }).count();
  // const notPaidOrders = numberOfOrders - paidOrders;
  // const numberOfClients = await User.find().count();
  // const numberOfProducts = await Product.find().count();
  // const productsWithNoInventory = await Product.find({
  //   inStock: { $eq: 0 },
  // }).count();
  // const lowInventory = await Product.find({ inStock: { $lte: 30 } }).count();
  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  ] = await Promise.all([
    Order.find().count(),
    Order.find({ isPaid: { $eq: true } }).count(),
    User.find().count(),
    Product.find().count(),
    Product.find({
      inStock: { $eq: 0 },
    }).count(),
    Product.find({ inStock: { $lte: 30 } }).count(),
  ]);

  await db.disconnect();

  res.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders: numberOfOrders - paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  });
}
