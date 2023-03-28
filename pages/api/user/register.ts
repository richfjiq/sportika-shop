import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { join, resolve } from 'path';
import { readFileSync } from 'fs';
import Handlebars from 'handlebars';

import { db } from '../../../database';
import { User } from '../../../models';
import { jwt, validations } from '../../../utils';
import { IUser } from '../../../interfaces';

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        email: string;
        name: string;
        role: string;
        type: string;
      };
    };

const sendWelcomeMail = async (msg: MailDataRequired): Promise<void> => {
  try {
    await sgMail.send(msg);
    console.log('Welcome email, sent successfully :)');
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
      return registerUser(req, res);

    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = '',
    password = '',
    name = '',
  } = req.body as { email: string; password: string; name: string };

  if (password.length < 6) {
    return res.status(400).json({
      message: 'Password must have at least 6 characters',
    });
  }

  if (name.length < 2) {
    return res.status(400).json({
      message: 'Name must have at least 2 characters',
    });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({
      message: 'Email is not valid',
    });
  }

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      message: 'Email already exists.',
    });
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'client',
    name,
    type: 'credentials',
  });

  try {
    await newUser.save({ validateBeforeSave: true });
    await db.disconnect();
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(500).json({
      message: 'Server error',
    });
  }

  const { _id, role, type } = newUser as IUser;
  const token = jwt.signToken(_id, email);

  const viewsDir = resolve(process.cwd(), 'views');
  const templateHandlebars = join(viewsDir, 'welcome.handlebars');
  const fileHandlebars = readFileSync(templateHandlebars, 'utf-8');
  const template = Handlebars.compile(fileHandlebars);

  const emailData = {
    to: newUser.email,
    from: 'rfjiq1986@gmail.com',
    subject: 'Congratulations! You are made it!',
    html: template({ name }),
  };

  await sendWelcomeMail(emailData);

  return res
    .status(200)
    .json({ message: 'User has been registered. Please Log in.' });
};
