import * as express from "express";
import { Request , Response, NextFunction} from "express";


export function nonexistentPageHandler (req: Request, res: Response, next: NextFunction) {
  res.status(404);

  if (req.accepts('html')) {
    res.sendFile('/Users/user/projects/module2/module2_part3_gallery/backend/views/pages/404.html');
    return;
  }
}