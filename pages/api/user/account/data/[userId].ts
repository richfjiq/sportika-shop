import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '../../../../../database';
import { IUserUpdateData } from '../../../../../interfaces';
import { User } from '../../../../../models';

type Data =
  | {
      message: string;
    }
  | {
      _id: string;
      email: string;
      name: string;
      role: string;
      type: string;
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'PUT':
      return updateUserData(req, res);
    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}

const updateUserData = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { userId = '' } = req.query;
  const { name, email, currentPassword } = req.body as IUserUpdateData;

  try {
    await db.connect();

    const user = await User.findById(userId);

    if (user === null) {
      res.status(400).json({ message: 'There is no user with this id.' });
      return;
    }

    if (!bcrypt.compareSync(currentPassword, user.password as string)) {
      res.status(400).json({ message: 'Current password is incorrect.' });
      return;
    }

    await user.update({
      name,
      email,
    });

    await db.disconnect();

    const userUpdated = {
      _id: user._id,
      email,
      role: user.role,
      name,
      type: user.type,
    };

    res.status(200).json(userUpdated);
  } catch (error) {
    await db.disconnect();
    res.status(400).json({
      message: 'Server Error',
    });
  }
};
