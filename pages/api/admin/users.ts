import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { IUser } from '../../../interfaces';
import { User } from '../../../models';

type Data =
  | {
      message: string;
    }
  | IUser[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getUsers(req, res);

    case 'PUT':
      return updateUsers(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session: any = await getSession({ req });

  if (!session) {
    return res.status(404).json({ message: 'Unauthorized' });
  }

  if (session.user.role === 'client') {
    return res.status(404).json({ message: 'Unauthorized' });
  }

  await db.connect();
  const users = await User.find().select('-password').lean();
  await db.disconnect();

  return res.status(200).json(users);
};

const updateUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session: any = await getSession({ req });
  const { userId = '', role = '' } = req.body;

  if (!session) {
    return res.status(404).json({ message: 'Unauthorized' });
  }

  if (session.user.role === 'client') {
    return res.status(404).json({ message: 'Unauthorized' });
  }

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ message: 'There is no user with this id.' });
  }

  const validRoles = ['admin', 'client'];
  if (!validRoles.includes(role)) {
    return res.status(404).json({ message: 'Role not allowed.' });
  }

  await db.connect();
  const user = await User.findById(userId);
  if (!user) {
    await db.disconnect();
    return res.status(404).json({ message: `User not found: ${userId}` });
  }
  user.role = role;
  await user.save();
  await db.disconnect();

  return res.status(200).json({ message: 'Updated user.' });
};
