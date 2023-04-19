import { NextFunction, Request, Response } from 'express';

export const notFoundHandler =
  ({ whitelist = [] }: { whitelist: string[] } = { whitelist: [] }) =>
  (request: Request, response: Response, next: NextFunction) => {
    const { path } = request;
    if (whitelist.includes(path)) {
      return next();
    }
    return response.status(404).json({ message: 'Not Found' });
  };

export default notFoundHandler;
