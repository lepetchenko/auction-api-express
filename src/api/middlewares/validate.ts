import { Schema, assert } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { badData } from '@hapi/boom';

export default (schema: Schema, property: 'body' | 'params' = 'body') => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    assert(req[property], schema, { abortEarly: false });
    next();
  } catch (error: any) {
    const { details } = error;
    const message = details.map((i: { message:string }) => i.message).join(', ').replaceAll('"', '\'');

    throw badData(message);
  }
};
