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

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case 'GET':
      return getUserAddress(req, res);
    case 'PUT':
      return updateUserAddress(req, res);
    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
};

const getUserAddress = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { userId = '' } = req.query;

  try {
    await db.connect();
    const address = await Address.find({ user: userId }).select('-__v');
    await db.disconnect();

    return res.status(200).json(address as IAddress[]);
  } catch (error) {
    return res.status(400).json({ message: 'Server Error.' });
  }
};

const updateUserAddress = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { userId = '' } = req.query;
  const {
    firstName,
    lastName,
    address,
    zip,
    city,
    state,
    country,
    code,
    phone,
  } = req.body as IAddress;

  try {
    await db.connect();
    const obj = await Address.find<IAddress>({ user: userId });
    const userAddress = await Address.findByIdAndUpdate(
      obj[0]._id,
      {
        user: userId,
        firstName,
        lastName,
        address,
        zip,
        city,
        state,
        country,
        code,
        phone,
      },
      { new: true }
    );
    res.status(201).json(userAddress as IAddress);
    await db.disconnect();
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: 'Server error.' });
  }
};

export default handler;
