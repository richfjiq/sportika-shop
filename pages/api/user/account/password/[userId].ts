import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '../../../../../database';
import { IUserUpdatePassword } from '../../../../../interfaces';
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
      return updateUserPassword(req, res);
    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}

const updateUserPassword = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { userId = '' } = req.query;
  const { currentPassword, newPassword } = req.body as IUserUpdatePassword;

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
      password: bcrypt.hashSync(newPassword),
    });

    await db.disconnect();

    const userUpdated = {
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
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
