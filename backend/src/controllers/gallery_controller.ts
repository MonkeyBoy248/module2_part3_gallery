import * as express from 'express';
import { Request, Response } from "express";
import { Controller } from "../interfaces/controller";
import { GalleryObject } from "../interfaces/gallery_object";
import { Pictures } from "../utils/gallery_pictures";
import { checkAuthorizationHeader } from "../middleware/authentication";

export class GalleryController implements Controller {
  public path = '/gallery';
  public router = express.Router();

  constructor() {
    this.setRoute();
  }

  public setRoute () {
    return this.router.get(this.path, checkAuthorizationHeader, this.sendGalleryResponse);
  }

  createGalleryResponseObject = (objects: string[], total: number, page: string ): GalleryObject => {
    const pageNumber = Number(page);
    const objectsTraversePattern = objects.slice((pageNumber - 1) * Pictures.PICTURES_PER_PAGE, pageNumber * Pictures.PICTURES_PER_PAGE);
    const response: GalleryObject = {
      objects: objectsTraversePattern,
      total,
      page: pageNumber
    }

    return response;
  }

  sendGalleryResponse = async (req: Request, res: Response) => {
    const pictureNames = await Pictures.getPictures();
    const totalPagesAmount = Pictures.countTotalPagesAmount(pictureNames)
    const pageNumber = req.query.page ? String(req.query.page) : '1';
    const responseObject = this.createGalleryResponseObject(pictureNames, totalPagesAmount, pageNumber);

    if (req.headers.authorization !== 'token') {
      res.status(403).send();
      return;
    }

    if (Number(pageNumber) <= 0 || Number(pageNumber) > totalPagesAmount) {
      res.status(404).send();
      return;
    }

    res.status(200).json(responseObject);
  }
}