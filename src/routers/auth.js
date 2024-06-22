import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import { loginUserController, logoutUserController, refreshTokenController, registerUserController, sendResetEmailController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { sendResetPasswordSchema } from '../validation/sendResetPasswordSchema.js';

export const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
authRouter.post(
    '/login',
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
  );
  authRouter.post(
    '/refresh',
    authenticate,
    ctrlWrapper(refreshTokenController),
  );
  authRouter.post(
    '/logout',
    ctrlWrapper(logoutUserController),
  );
  authRouter.post('/refresh', authenticate, ctrlWrapper(refreshTokenController));
  authRouter.post('/logout', authenticate, ctrlWrapper(logoutUserController));

  authRouter.post(
    '/send-reset-email',
    validateBody(sendResetPasswordSchema),
    ctrlWrapper(sendResetEmailController),
  );



