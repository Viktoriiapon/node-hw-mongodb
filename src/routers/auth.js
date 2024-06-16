import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
// authRouter.post(
//     '/login',
//     validateBody(registerUserSchema),
//     ctrlWrapper(registerUserController),
//   );
//   authRouter.post(
//     '/refresh-token',
//     validateBody(registerUserSchema),
//     ctrlWrapper(registerUserController),
//   );
//   authRouter.post(
//     '/logout',
//     validateBody(registerUserSchema),
//     ctrlWrapper(registerUserController),
//   );
 

export default authRouter;