
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Handlebars from 'handlebars';
import fs from 'node:fs/promises';
import path from 'node:path';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';
import { sendMail } from '../utils/sendMail.js';
import { ENV_VARS, TEMPLATE_DIR } from '../constants/index.js';
import { env } from '../utils/env.js';

export const createUser = async (payload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  // const user = await User.findOne({ email: payload.email });

  // if (user) {
  //   throw createHttpError(409, 'Email in use');
  // }
  return await User.create({
    ...payload,
    password: hashedPassword,
  });
};


const createSession = () => {
  return {
    accessToken: crypto.randomBytes(10).toString('base64'),
    refreshToken: crypto.randomBytes(10).toString('base64'),
    accessTokenValidUntil: Date.now() + 1000 * 60 * 15,
    refreshTokenValidUntil: Date.now() + 1000 * 60 * 60 * 24 * 30,
  };
};


export const loginUser = async (payload) => {
  const user =    await User.findOne({email: payload.email});

  if (!user) {
    throw createHttpError(404, 'User is not found');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await Session.deleteOne({ userId: user._id });  

  return await Session.create({
    userId: user._id,
    ...createSession(),
  });
};

export const refreshSession = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found!!');
  }

  await Session.deleteOne({ _id: sessionId });

  if (new Date() > session.refreshTokenValidUntil) {
    throw createHttpError(401, 'Refresh token is expired!');
  }

  // const user = await User.findById(session.userId);

  // if (!user) {
  //   throw createHttpError(401, 'Session for this user not found!');
  // }

 

  return await Session.create({
    userId: session.user._id,
    ...createSession(),
  });
};

export const logoutUser = async ({ sessionId, sessionToken }) => {
  return await Session.deleteOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });
};

export const requestResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
};

export const sendResetEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User is not found');
  }
const token = jwt.sign({
  sub: user._is,
  email,
},
  env(ENV_VARS.JWT_SECRET),
  {
    expiresIn: '5m',
  }
); 
const templateSource = await fs.readFile(
  path.join(TEMPLATE_DIR, 'send-reset-password.html'),
);

const template = Handlebars.compile(templateSource.toString());

const html = template({
  name: user.name,
  link: `${env(ENV_VARS.FRONTEND_HOST)}/reset-password?token=${token}`,
});
try{
  await sendMail({
    html,
    to: email,
    from: env(ENV_VARS.SMTP_FROM),
    subject: 'Reset your password',
  
  })
}catch(err){ 
  console.log(err)
createHttpError(500, 'Problem with sending') }


};

// export const resetPassword = async ({ token, password }) => {
//   let tokenPayload;
//   try {
//     tokenPayload = jwt.verify(token, env(ENV_VARS.JWT_SECRET));
//   } catch (err) {
//     throw createHttpError(401, err.message);
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   await User.findOneAndUpdate(
//     {
//       _id: tokenPayload.sub,
//       email: tokenPayload.email,
//     },
//     { password: hashedPassword },
//   );
// };
//
export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, env('JWT_SECRET'));
  } catch (err) {
    if (err instanceof Error)
      throw createHttpError(401, 'Token is expired or invalid.', {
        detail: err.message,
        cause: err,
      });
    throw err;
  }

  const user = await UsersCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  await UsersCollection.updateOne(
    { _id: user._id },
    { password: hashedPassword },
  );
};