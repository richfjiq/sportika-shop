import axios, { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { getSession } from 'next-auth/react';
import { isValidObjectId } from 'mongoose';
import Handlebars from 'handlebars';

import { db } from '../../../database';
import { IPaypal } from '../../../interfaces';
import { Order } from '../../../models';
import path, { join, resolve } from 'path';
import { readFileSync } from 'fs';
import { currency } from '../../../utils';

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return payOrder(req, res);
    default:
      return res.status(400).json({ message: 'Bad request.' });
  }
}

const sendOrderPaidMail = async (msg: MailDataRequired): Promise<void> => {
  try {
    await sgMail.send(msg);
    console.log('Order Paid email, sent successfully!');
  } catch (error) {
    console.log({ error });
  }
};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64');
  const body = new URLSearchParams('grant_type=client_credentials');

  try {
    const { data } = await axios.post(
      process.env.PAYPAL_OAUTH_URL || '',
      body,
      {
        headers: {
          Authorization: `Basic ${base64Token}`,
          'Content-Type': 'application/x-wwww-form-urlencoded',
        },
      }
    );

    return data.access_token;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.message);
    } else {
      console.log(error);
    }

    return null;
  }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session: any = await getSession({ req });
  const { transactionId = '', orderId = '' } = req.body;

  if (!session) {
    return res
      .status(401)
      .json({ message: 'You have to be authenticated for this action.' });
  }

  if (!isValidObjectId(orderId)) {
    res.status(400).json({
      message: 'Invalid id.',
    });
    return;
  }

  const paypalBearerToken = await getPaypalBearerToken();

  if (!paypalBearerToken) {
    return res.status(400).json({ message: 'Paypal token unconfirmed' });
  }

  const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(
    `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${paypalBearerToken}`,
      },
    }
  );

  if (data.status !== 'COMPLETED') {
    return res.status(401).json({ message: 'Unrecognized order.' });
  }

  await db.connect();
  const dbOrder = await Order.findById(orderId);

  if (!dbOrder) {
    await db.disconnect();
    return res
      .status(401)
      .json({ message: 'Order does not exist in database.' });
  }

  if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
    await db.disconnect();
    return res
      .status(401)
      .json({ message: 'Paypal amount and order amount do not match.' });
  }

  dbOrder.transactionId = transactionId;
  dbOrder.isPaid = true;
  dbOrder.save();
  await db.disconnect();

  const viewsDir = resolve(process.cwd(), 'views');
  const templateHandlebars = join(viewsDir, 'orderPaid.handlebars');
  const fileHandlebars = readFileSync(templateHandlebars, 'utf-8');
  const template = Handlebars.compile(fileHandlebars);

  const items = dbOrder.orderItems.map((item) => ({
    image: item.image,
    price: currency.format(item.price),
    title: item.title,
    size: item.size,
    quantity: item.quantity,
  }));

  const emailData = {
    to: session.user?.email,
    from: 'rfjiq1986@gmail.com',
    subject: 'Your order has been paid!',
    html: template({
      order: dbOrder._id,
      items,
      name: `${dbOrder.shippingAddress.firstName} ${dbOrder.shippingAddress.lastName}`,
      address: dbOrder.shippingAddress.address,
      city: `${dbOrder.shippingAddress.city}, ${
        dbOrder.shippingAddress?.state as string
      }, ${dbOrder.shippingAddress.zip}`,
      country: dbOrder.shippingAddress.country,
      phoneNumber: `${dbOrder.shippingAddress.code} ${dbOrder.shippingAddress.phone}`,
      totalItems: dbOrder.numberOfItems,
      subtotal: currency.format(dbOrder.subTotal),
      tax: currency.format(dbOrder.tax),
      total: currency.format(dbOrder.total),
    }),
  };

  await sendOrderPaidMail(emailData);

  return res.status(200).json({ message: 'Paid order.' });
};
