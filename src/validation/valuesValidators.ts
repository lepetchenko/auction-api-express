import Joi from 'joi';

export const userName = Joi.string().min(3).max(30);

export const email = Joi.string().email();

// TODO use better password validation, not just only string
export const password = Joi.string();

export const scheduledStart = Joi.date().greater(Date.now());

export const initialPrice = Joi.number().integer().min(0);

export const actualPrice = Joi.number().integer().min(0);

export const bidStep = Joi.number().integer().min(0);

const entityIdMethod = (value: string, helpers: any) => {
  if (!/^[0-9a-fA-F]{24}$/.test(value)) {
    return helpers.message('id has wrong format');
  }

  return value;
};

export const entityId = Joi.string().custom(entityIdMethod);
