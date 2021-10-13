import Joi from 'joi';

const userNameValidator = Joi.string()
  .min(3)
  .max(30)
  .required();

const userEmailValidator = Joi.string()
  .email()
  .required();

const userPassowrdValidator = Joi.string()
  .required();

const userInputScheme = Joi.object({
  userName: userNameValidator,
  email: userEmailValidator,
  password: userPassowrdValidator,
});

export default userInputScheme;
