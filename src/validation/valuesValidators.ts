import Joi from 'joi';

export const entityId = Joi.string();

export const userName = Joi.string().min(3).max(30);

export const email = Joi.string().email();

// TODO use better password validation, not just only string
export const password = Joi.string();

export const scheduledStart = Joi.date().greater(Date.now());

export const initialPrice = Joi.number().integer().min(0);

export const actualPrice = Joi.number().integer().min(0);

export const bidStep = Joi.number().integer().min(0);
