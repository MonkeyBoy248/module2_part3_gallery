import * as fs from 'fs';
import path from "path";
import {setDateFormat, writeLogs} from "./log_file";
import {isNodeError} from "./error_type_check";

export class Pictures {
  public static API_IMAGES_PATH: string = path.join(__dirname, '..', '..', 'public', 'api_images');
  public static PICTURES_PER_PAGE: number = 4;

  static async getPictures () {
    try {
      const fileNames = await fs.promises.readdir(Pictures.API_IMAGES_PATH);
      return fileNames;
    } catch (err) {
      const errMessage = isNodeError(err) ? err.code : "File rename failed";

      await writeLogs(`${setDateFormat()} ${this.getPictures.name} ${errMessage}`);
    }
  }

  static async getPicturesLength () {
    const pictures = await this.getPictures();

    if (pictures) {
      try {
        return pictures.length;
      } catch (err) {
        const errMessage = err instanceof Error ? err.message : "Pictures amount calculation failed";

        await writeLogs(errMessage);
      }
    }
  }

  static countTotalPagesAmount (pictures: string[]): number {
    const picturesTotal = pictures.length;
    let totalPages: number;
  
    if (picturesTotal % Pictures.PICTURES_PER_PAGE === 0 ) {
      totalPages = Math.floor(picturesTotal / Pictures.PICTURES_PER_PAGE);
    } else {
      totalPages = Math.floor(picturesTotal / Pictures.PICTURES_PER_PAGE) + 1;
    }
  
    return totalPages;
  }
}














