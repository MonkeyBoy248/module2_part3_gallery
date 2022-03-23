import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { Pictures } from "./gallery_pictures";


export async function renameFile (req: Request, res: Response) {
  const pictureData = req.file;
  const picturesLength = await Pictures.getPicturesLength();

  console.log('req', pictureData);

  try {
    if (pictureData) {
      const pictureName = `image_${picturesLength}${pictureData.originalname.slice(pictureData.originalname.indexOf('.'))}`
      console.log(pictureName);

      await fs.promises.rename(
        pictureData.path,
        path.join(__dirname, '..', '..', 'backend', 'public', 'api_images', pictureName));

      console.log('File renamed')
      res.sendStatus(200);
    }
  } catch  {
    res.sendStatus(500);
  }
}