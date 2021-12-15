import Joi from 'joi';

export const userName = Joi.string()
  .min(3)
  .max(30);

export const email = Joi.string()
  .email();

export const password = Joi.string();
