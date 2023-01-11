import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { Address } from '../../../../models';

interface IAddress {
  user: string;
  firstName: string;
  lastName: string;
  address: string;
  zip: string;
  city: string;
  state: string;
  country: string;
  code: string;
  phone: string;
  _id?: string;
}

type Data =
  | {
      message: string;
    }
  | IAddress[]
  | IAddress;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return createAddress(req, res);
    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
}

const createAddress = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  const {
    user,
    firstName,
    lastName,
    address,
    zip,
    city,
    state,
    country,
    code,
    phone,
  } = req.body;

  try {
    await db.connect();
    const userAddress = new Address({
      user,
      firstName,
      lastName,
      address,
      zip,
      city,
      state,
      country,
      code,
      phone,
    });

    await userAddress.save();
    res.status(201).json(userAddress as IAddress);
    await db.disconnect();
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: 'Server error.' });
  }
};
