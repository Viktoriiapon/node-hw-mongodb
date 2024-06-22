
import Joi from 'joi';
export const sendResetPasswordSchema = Joi.object({
  
    email: Joi.string().email().min(3).max(30),
   
  
  });