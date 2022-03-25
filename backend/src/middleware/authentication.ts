import { Request, Response, NextFunction } from "express";

export function checkAuthorizationHeader (req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization !== 'token') {
    res.sendStatus(403)
    return;
  }

  next();
}

