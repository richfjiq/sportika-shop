import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import axios, { AxiosError } from 'axios';
import Handlebars from 'handlebars';
import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { readFileSync } from 'fs';
import path from 'path';

import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Order, Product } from '../../../models';
import { currency } from '../../../utils';

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

type Data =
  | {
      message: string;
    }
  | IOrder;

const sendOrderConfirmedMail = async (msg: MailDataRequired): Promise<void> => {
  try {
    await sgMail.send(msg);
    console.log('Order Confirmed email, sent successfully!');
  } catch (error) {
    console.log({ error });
  }
};

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

    const pathHandlebars = path.join(
      __dirname,
      '../../../views/orderConfirmed.handlebars'
    );
    const fileHandlebars = readFileSync(pathHandlebars, 'utf-8');

    const template = Handlebars.compile(fileHandlebars);

    const items = newOrder.orderItems.map((item) => ({
      image: item.image,
      price: currency.format(item.price),
      title: item.title,
      size: item.size,
      quantity: item.quantity,
    }));

    const emailData = {
      to: session.user.email,
      from: 'rfjiq1986@gmail.com',
      subject: 'Your order has been confirmed!',
      html: template({
        order: newOrder._id,
        items,
        name: `${newOrder.shippingAddress.firstName} ${newOrder.shippingAddress.lastName}`,
        address: newOrder.shippingAddress.address,
        city: `${newOrder.shippingAddress.city}, ${
          newOrder.shippingAddress?.state as string
        }, ${newOrder.shippingAddress.zip}`,
        country: newOrder.shippingAddress.country,
        phoneNumber: `${newOrder.shippingAddress.code} ${newOrder.shippingAddress.phone}`,
        totalItems: newOrder.numberOfItems,
        subtotal: currency.format(newOrder.subTotal),
        tax: currency.format(newOrder.tax),
        total: currency.format(newOrder.total),
      }),
    };

    await sendOrderConfirmedMail(emailData);

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
