import {
  createUser,
  loginUser,
  logoutUser,
  refreshSession,
} from '../services/auth.js';

export const registerUserController = async (req, res, next) => {
  const user = await createUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

const setupSession = (res, session) => {
  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    expire: new Date(Date.now() + 30 * 24 * 60 * 60),
  });

  res.cookie('sessionId', session._id, {  
    httpOnly: true,
    expire: new Date(Date.now() + 30 * 24 * 60 * 60),
  });
};

export const loginUserController = async (req, res, next) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};

export const refreshTokenController = async (req, res, next) => {
  const { sessionId, sessionToken } = req.cookies;
  const session = await refreshSession({ sessionId, sessionToken });

  setupSession(res, session);

  res.status(201).json({
    status: 201,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res, next) => {
  if (req.cookies.sessionId){
    await logoutUser({
      sessionId: req.cookies.sessionId,
      sessionToken: req.cookies.sessionToken,
    });
  }

  res.clearCookie('sessionToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};


