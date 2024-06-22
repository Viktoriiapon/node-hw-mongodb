import createHttpError from 'http-errors';

import { Session } from '../db/models/session.js';
import { User } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const header = req.get('Authorization');

  if (!header) {
    next(createHttpError(401, 'Header is not provided'));
    return;
  }
  const [bearer, token] = header.split(' ');

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Header should be of bearer type'));
    return;
  }
  const session = await Session.findOne({ accessToken: token });

  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  if (Date.now() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await User.findById(session.userId);
  if (!user) {
    next(
      createHttpError(401, 'User associated with this session is not found'),
    );
    return;
  }
  req.user = user;

  next();
};
