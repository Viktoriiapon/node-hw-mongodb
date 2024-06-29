import {
  createUser,
  loginUser,
  logoutUser,
  refreshSession,
  resetPassword,
  sendResetEmail,
} from '../services/auth.js';


export const registerUserController = async (req, res, next) => {
  const user = await createUser(req.body);

  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: { user },
  });
};
// const setupSession = (res, session) => {
//   res.cookie('refreshToken', session.refreshToken, {
//     httpOnly: true,
//     expire: new Date(Date.now() + 30 * 24 * 60 * 60),
//   });

//   res.cookie('sessionId', session._id, {  
//     httpOnly: true,
//     expire: new Date(Date.now() + 30 * 24 * 60 * 60),
//   });
// };

const setupSession = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: 7 * 24 * 60 * 60,
  });
  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    expire: 7 * 24 * 60 * 60,
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


export const refreshTokenController = async (req, res) => {
  const session = await refreshSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { 
      accessToken: session.accessToken
     },
  });
};



export const logoutUserController = async (req, res, next) => {
  if (req.cookies.sessionId){
    await logoutUser({
      sessionId: req.cookies.sessionId,
      sessionToken: req.cookies.sessionToken,
    });
  }

  res.clearCookie('sessionId');
  res.clearCookie('sessionToken');

  res.status(204).send();
};
export const sendResetEmailController= async (req, res, next)=>{
  await sendResetEmail(req.body.email);
  res.status(200).json({
    status: 200,
    message: 'Reset password was successfully send!',
    data: {},
  });
}

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.status(200).json({
    message: 'Password has been successfully reset!',
    status: 200,
    data: {},
  });
};