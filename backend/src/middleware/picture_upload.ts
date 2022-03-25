import multer from "multer";
import path from "path";
import { Request, Response, NextFunction } from "express";

export const upload = multer({dest: path.join(__dirname, '..', '..', 'public', 'api_images')});

