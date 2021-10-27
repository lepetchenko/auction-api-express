import { Response, Request } from 'express';

export const mockResponse = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
} as Partial<Response>);

export const mockRequest = (requestContent?: any) => ({
  ...requestContent,
} as Request);
