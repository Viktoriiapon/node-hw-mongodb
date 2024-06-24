
import Joi from 'joi';
export const sendResetPasswordSchema = Joi.object({
  
    email: Joi.string().email().min(3).max(30),
   
  
  });

  export const resetPasswordSchema = Joi.object({
    password: Joi.string().required(),
    token: Joi.string().required(),
  });