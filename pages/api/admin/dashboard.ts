import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Order, Product, User } from '../../../models';

type Data = {
  numberOfOrders: number;
  paidOrders: number;
  notPaidOrders: number;
  numberOfClients: number;
  numberOfProducts: number;
  productsWithNoInventory: number;
  lowInventory: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connect();
  const numberOfOrders = await Order.find().count();
  const paidOrders = await Order.find({ isPaid: { $eq: true } }).count();
  const notPaidOrders = numberOfOrders - paidOrders;
  const numberOfClients = await User.find().count();
  const numberOfProducts = await Product.find().count();
  const productsWithNoInventory = await Product.find({
    inStock: { $eq: 0 },
  }).count();
  const lowInventory = await Product.find({ inStock: { $lte: 30 } }).count();
  await db.disconnect();

  res.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  });
}
