import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import axios, { AxiosError } from 'axios';

import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Order, Product } from '../../../models';

type Data =
  | {
      message: string;
    }
  | IOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder;
  const session: any = await getSession({ req });

  if (!session) {
    return res
      .status(401)
      .json({ message: 'You have to be authenticated for this action.' });
  }

  const productsIds = orderItems.map((product) => product._id);
  await db.connect();

  const dbProducts = await Product.find({ _id: { $in: productsIds } });

  try {
    const subTotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find(
        // data from db use product.id not product._id
        (product) => product.id === current._id
      )?.price;
      if (!currentPrice) {
        throw new Error('Verify the cart, product does not exist.');
      }

      return currentPrice * current.quantity + prev;
    }, 0);
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const backendTotal = subTotal * (taxRate + 1);

    if (total !== backendTotal) {
      throw new Error('Total does not match.');
    }

    const userId = session.user._id;
    const newOrder = new Order({
      ...req.body,
      isPaid: false,
      user: userId,
    });
    newOrder.total = Math.round(newOrder.total * 100) / 100;

    await newOrder.save();
    await db.disconnect();

    return res.status(201).json(newOrder);
  } catch (error) {
    await db.disconnect();
    console.log(error);

    if (error instanceof AxiosError) {
      return res.status(400).json(error.response?.data.message);
    }

    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  return res.status(201).json(req.body);
};
