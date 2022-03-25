import * as express from "express";
import { Request , Response, NextFunction} from "express";
import path from "path";


export function nonexistentPageHandler (req: Request, res: Response, next: NextFunction) {
  if (req.accepts('html')) {
    res.status(404).sendFile(path.join( __dirname, '..', '..', 'views', 'pages', '404.html'));
    return;
  }
}