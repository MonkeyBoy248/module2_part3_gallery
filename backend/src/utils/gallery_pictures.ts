import * as fs from 'fs';

export class Pictures {
  public static API_IMAGES_PATH: string = '/Users/user/projects/module2/module2_part3_gallery/backend/public/api_images';
  public static PICTURES_PER_PAGE: number = 4;

  static async getPictures () {
    const fileNames = await fs.promises.readdir(Pictures.API_IMAGES_PATH);

    for (let i = 0; i < fileNames.length; i++) {
      fileNames[i] = `http://localhost:8000/api_images/${fileNames[i]}`;
    }

    console.log(fileNames);
    return fileNames;
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














