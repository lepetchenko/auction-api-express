import Joi from 'joi';

export const userNameValidator = Joi.string()
  .min(3)
  .max(30)
  .required();

export const userEmailValidator = Joi.string()
  .email()
  .required();

export const userPasswordValidator = Joi.string()
  .required();

const userInputScheme = Joi.object({
  userName: userNameValidator,
  email: userEmailValidator,
  password: userPasswordValidator,
});

export default userInputScheme;
