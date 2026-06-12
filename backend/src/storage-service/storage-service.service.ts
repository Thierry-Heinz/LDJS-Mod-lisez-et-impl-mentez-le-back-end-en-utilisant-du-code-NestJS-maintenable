import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { rm, writeFile } from 'fs/promises';

@Injectable()
export class StorageServiceService {
  constructor() {}

  async savePictureOnDisk(picture: Express.Multer.File, URL: string) {
    await writeFile(URL, picture.buffer);
    return URL;
  }

  async deletePictureOnDisk(URL: string) {
    await rm(URL, { force: true });
  }

  generatePictureObject(picture: Express.Multer.File) {
    const keygen = randomUUID();
    const filename = `${keygen}-${picture.originalname}`;
    return {
      URL: `${process.env.SERVER_URL}:${process.env.PORT}/uploads/${filename}`,
      path: `./public/uploads/${filename}`,
    };
  }
}
