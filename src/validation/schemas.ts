import Joi from 'joi';
import * as valuesValidators from '@/validation/valuesValidators';

export const userSignInScheme = Joi.object({
  email: valuesValidators.email.required(),
  password: valuesValidators.password.required(),
});

export const userSignUpScheme = Joi.object({
  userName: valuesValidators.userName.required(),
  email: valuesValidators.email.required(),
  password: valuesValidators.password.required(),
});

export const auctionDataSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  scheduledStart: valuesValidators.scheduledStart,
  initialPrice: valuesValidators.initialPrice.required(),
  actualPrice: valuesValidators.actualPrice,
  bidStep: valuesValidators.bidStep.required(),
});

export const entityIdSchema = Joi.object({
  id: valuesValidators.entityId.required(),
});
