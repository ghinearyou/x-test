import { Request, Response, NextFunction } from 'express';

export type errorMessage = {
  message: string;
};

export function validateToken(headers: any): boolean {
  if (headers.token) {
    const token = headers.token;
    const exToken = token.split('|');
    const expired = new Date(exToken[2]);

    return expired >= new Date();
  }
  return false;
}

export function AuthorizationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { headers } = req;
  if (validateToken(headers)) {
    next();
  } else {
    res.status(400).send({
      message: 'Invalid Token',
    });
  }
}
