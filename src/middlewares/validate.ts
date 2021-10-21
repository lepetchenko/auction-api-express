import { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';

export default (schema: Schema, property: 'body' | 'query' = 'body') => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = schema.validate(req[property]);

  if (!error) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(',');

    res.status(422).json({ error: message });
  }
};
