export const sendResetPasswordSchema = Joi.object({
  
    email: Joi.string().email().min(3).max(20),
   
  
  });