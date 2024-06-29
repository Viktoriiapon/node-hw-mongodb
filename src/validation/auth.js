

import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().min(3).max(30),
  password: Joi.string().min(3).max(10).required(),

});

export const loginUserSchema = Joi.object({
  
  email: Joi.string().email().min(3).max(30),
  password: Joi.string().required(),

});


export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});
