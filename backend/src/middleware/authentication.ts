import { Request, Response, NextFunction } from "express";

export function checkAuthorizationHeader (req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization !== 'token') {
    res.status(403).send();
    return;
  }

  next();
}

