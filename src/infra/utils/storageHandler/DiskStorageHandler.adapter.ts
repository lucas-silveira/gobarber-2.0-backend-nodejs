import fs from 'fs';
import path from 'path';

import { storage } from '@infra/configs/upload';
import { IStorageHandler } from '@domain/protocols/utils/StorageHandler.interface';

class DiskStorageHandlerAdapter implements IStorageHandler {
  private storage: string;

  constructor() {
    this.storage = storage;
  }

  public async saveFile(folder: string, filename: string): Promise<void> {
    const sourceFilepath = path.join(this.storage, filename);
    const targetFilepath = path.join(this.storage, folder, filename);
    return fs.promises.rename(sourceFilepath, targetFilepath);
  }

  public async checkFileExistss(
    folder: string,
    filename: string,
  ): Promise<boolean> {
    const filepath = path.join(this.storage, folder, filename);
    try {
      await fs.promises.stat(filepath);
      return true;
    } catch (err) {
      return false;
    }
  }

  public async deleteFile(folder: string, filename: string): Promise<void> {
    const filepath = path.join(this.storage, folder, filename);
    return fs.promises.unlink(filepath);
  }
}

export default DiskStorageHandlerAdapter;
